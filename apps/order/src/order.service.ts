import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { ProductEntity } from '@/product/entities/product';
import { StoreEntity } from '@/store/entities/store';
import { OrderStatus } from '@app/common/enums/order-status.';
import { MessageErrors } from '@app/common/messages';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';

import { FindOrderDto } from './dtos/find';
import { OrderDto } from './dtos/order';
import { OrderEntity } from './entities/order';
import { OrderProductEntity } from './entities/order-product';
import { OrderStoreEntity } from './entities/order-store';

@Injectable()
export class OrderService {
  constructor(
    private connection: Connection,
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CreditCardEntity)
    private readonly creditCardRepository: Repository<CreditCardEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(OrderProductEntity)
    private readonly orderProductRepository: Repository<OrderProductEntity>,
    @InjectRepository(OrderStoreEntity)
    private readonly orderStoreRepository: Repository<OrderStoreEntity>,
    @InjectRepository(MutationEntity)
    private readonly mutationRepository: Repository<MutationEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
  ) { }

  private createOrderProducts(
    orderProducts: OrderProductEntity[],
    queryRunner: QueryRunner,
  ) {
    return orderProducts.map(async (p) => {
      const [product, mutation] = await Promise.all([
        this.productRepository.findOne({
          where: { id: p.product.id },
          relations: ['user', 'tags', 'categories', 'brand'],
        }),
        this.mutationRepository.findOne({
          where: { id: p.mutation.id },
          relations: ['variations'],
        })
      ]) 

      if (!product) {
        throw new BadRequestException('produto não encontrado');
      }

      p.user = product.user;
 
      if (!mutation) {
        throw new BadRequestException('mutação não encontrada');
      }

      if (mutation.stock - p.quantity < 0) {
        throw new BadRequestException('produto em estoque insuficiente');
      }

      mutation.stock = mutation.stock - p.quantity;
      product.salesQuantity = product.salesQuantity + p.quantity;

      await queryRunner.manager.save(mutation);
      await queryRunner.manager.save(product);

      const newProduct = this.orderProductRepository.create({
        netAmount: p.netAmount,
        grossAmount: p.grossAmount,
        mutation: p.mutation,
        quantity: p.quantity,
        product: p.product,
        brand: product.brand,
        categories: product.categories,
        user: product.user,
        freezeProduct: { product, mutation },
      });

      return queryRunner.manager.save(newProduct);
    });
  }

  private createOrderStores(
    orderStores: OrderStoreEntity[],
    queryRunner: QueryRunner,
  ) {
    return orderStores.map(async (ost) => {
      const store = await this.storeRepository.findOne({
        where: { id: ost.store.id },
        relations: ['paymentIntegration'],
      });

      if (!store) {
        throw new NotFoundException('loja não encontrado');
      }

      const orderProducts = await Promise.all(
        this.createOrderProducts(ost.orderProducts, queryRunner),
      );

      const newStore = this.orderStoreRepository.create({
        ...ost,
        store,
        orderProducts,
      });

      return queryRunner.manager.save(newStore);
    });
  }

  public async createCreditCardOrder(
    userId: string,
    dto: OrderDto,
  ): Promise<any> {
    const [foundUser, foundCreditCard, foundAddress] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.creditCardRepository.findOne({
        id: dto.creditCard.id,
        user: { id: userId },
      }),
      this.addressRepository.findOne({
        id: dto.address.id,
        user: { id: userId },
      }),
    ]);

    if (!dto.installments) {
      throw new BadRequestException('numero de parcelas são obrigatórias');
    }

    if (!dto.extraCreditCard) {
      throw new BadRequestException('informações do cartão são obrigatórias');
    }

    if (!foundUser) {
      throw new NotFoundException('usuário não encontrado');
    }

    if (!foundCreditCard) {
      throw new NotFoundException('cartão de crédito não encontrado');
    }

    if (!foundAddress) {
      throw new NotFoundException('endereço não encontrado');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderStores = await Promise.all(
        this.createOrderStores(dto.orderStores, queryRunner),
      );

      const newOrder = this.repository.create({
        freezePurchaser: foundUser,
        invoiceType: dto.invoiceType,
        address: foundAddress,
        creditCard: foundCreditCard,
        ordersStores: orderStores,
        purchaser: foundUser,
      });

      await queryRunner.manager.save(newOrder);
      await queryRunner.commitTransaction();

      return newOrder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  public async createBoletoOrder(userId: string, dto: OrderDto): Promise<any> {
    const [foundUser, foundAddress] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.addressRepository.findOne({
        id: dto.address.id,
        user: { id: userId },
      }),
    ]);

    if (!dto.installments) {
      throw new BadRequestException('numero de parcelas são obrigatórias');
    }

    if (!foundUser) {
      throw new NotFoundException('usuário não encontrado');
    }

    if (!foundAddress) {
      throw new NotFoundException('endereço não encontrado');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderStores = await Promise.all(
        this.createOrderStores(dto.orderStores, queryRunner),
      );

      const newOrder = this.repository.create({
        freezePurchaser: foundUser,
        invoiceType: dto.invoiceType,
        address: foundAddress,
        ordersStores: orderStores,
        purchaser: foundUser,
      });

      await queryRunner.manager.save(newOrder);
      await queryRunner.commitTransaction();

      return newOrder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  public async createPixOrder(userId: string, dto: OrderDto): Promise<any> {
    const [foundUser, foundAddress] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.addressRepository.findOne({
        id: dto.address.id,
        user: { id: userId },
      }),
    ]);

    if (!foundUser) {
      throw new NotFoundException('usuário não encontrado');
    }

    if (!foundAddress) {
      throw new NotFoundException('endereço não encontrado');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderStores = await Promise.all(
        this.createOrderStores(dto.orderStores, queryRunner),
      );

      const newOrder = this.repository.create({
        freezePurchaser: foundUser,
        invoiceType: dto.invoiceType,
        address: foundAddress,
        ordersStores: orderStores,
        purchaser: foundUser,
      });

      await queryRunner.manager.save(newOrder);
      await queryRunner.commitTransaction();

      return newOrder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  public async createDebitOrder(userId: string, dto: OrderDto): Promise<any> {
    const [foundUser, foundCreditCard, foundAddress] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.creditCardRepository.findOne({
        id: dto.creditCard.id,
        user: { id: userId },
      }),
      this.addressRepository.findOne({
        id: dto.address.id,
        user: { id: userId },
      }),
    ]);

    if (!dto.installments) {
      throw new BadRequestException('numero de parcelas são obrigatórias');
    }

    if (!dto.extraCreditCard) {
      throw new BadRequestException('informações do cartão são obrigatórias');
    }

    if (!foundUser) {
      throw new NotFoundException('usuário não encontrado');
    }

    if (!foundCreditCard) {
      throw new NotFoundException('cartão de crédito não encontrado');
    }

    if (!foundAddress) {
      throw new NotFoundException('endereço não encontrado');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderStores = await Promise.all(
        this.createOrderStores(dto.orderStores, queryRunner),
      );

      const newOrder = this.repository.create({
        freezePurchaser: foundUser,
        invoiceType: dto.invoiceType,
        address: foundAddress,
        creditCard: foundCreditCard,
        ordersStores: orderStores,
        purchaser: foundUser,
      });

      await queryRunner.manager.save(newOrder);
      await queryRunner.commitTransaction();

      return newOrder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  public async find(
    query: FindOrderDto,
    userId: string,
  ): Promise<[OrderEntity[], number]> {
    const { skip, take, relations, orderBy, select, where } = query;

    const orders = await this.repository.findAndCount({
      where: {
        ...where,
        purchaser: { id: userId },
      },
      order: orderBy,
      skip,
      take,
      relations: [...relations],
      select,
    });

    const newOrders = orders[0].map((order) => {
      const isProccessed = order.ordersStores.find(
        (os) => os.trackingStatus === OrderStatus.processed,
      );

      const isShipped = order.ordersStores.find(
        (os) => os.trackingStatus === OrderStatus.shipped,
      );

      const isReceived = order.ordersStores.find(
        (os) => os.trackingStatus === OrderStatus.received,
      );

      if (isProccessed) order.trackingStatus = OrderStatus.processed;

      if (isShipped) order.trackingStatus = OrderStatus.shipped;

      if (isReceived) order.trackingStatus = OrderStatus.received;

      return order;
    });

    return [newOrders, orders[1]];
  }

  public async findById(userId: string, id: string) {
    const [foundUser, foundOrder] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.repository.findOne({
        where: { id },
        relations: [
          'address',
          'purchaser',
          'ordersStores',
          'ordersStores.orderProducts',
        ],
      }),
    ]);

    if (foundUser.id !== foundOrder.purchaser.id) {
      throw new ForbiddenException(MessageErrors.forbidenToAccess);
    }

    if (!foundOrder) {
      throw new NotFoundException('compra não encontrada');
    }

    return foundOrder;
  }
}
