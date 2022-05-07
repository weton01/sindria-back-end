import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { InvoiceTypes } from '@app/common/enums/invoice-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FindOrderDto } from './dtos/find';
import { OrderDto } from './dtos/order';
import { OrderEntity } from './entities/order';
import { OrderProductEntity } from './entities/order-product';
import { OrderStoreEntity } from './entities/order-store';

@Injectable()
export class OrderService {
  constructor(
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
  ) { }

  async createCreditCardOrder(userId: string, dto: OrderDto): Promise<OrderEntity> {
    const [foundUser, foundCreditCard, foundAddress] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.creditCardRepository.findOne({ id: dto.creditCard.id }),
      this.addressRepository.findOne({ id: dto.address.id }),
    ])

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado')

    if (!foundCreditCard)
      throw new NotFoundException('cartão de crédito não encontrado')

    if (!foundAddress)
      throw new NotFoundException('endereço não encontrado')

    const newProducts = await Promise.all(dto.orderProducts.map(async p => {
      const newProduct = this.orderProductRepository.create({ ...p, freezeProduct: p, user: p.product.user })
      return await this.orderProductRepository.save(newProduct)
    }))

    const userIds = newProducts.map(p => p.user.id)
    const uniqueIds = Array.from(new Set(userIds))

    const newStores: OrderStoreEntity[] = []

    uniqueIds.map((userId, index) => {
      newStores[index] = new OrderStoreEntity()
      newStores[index].products = []
      newStores[index].totalAmount = 0
      newProducts.map(product => {
        if (product.user.id === userId) {
          newStores[index].totalAmount += product.netAmount;
          newStores[index].products.push(product)
          newStores[index].store = product.user
        }
      })
    })

    const newStoresCreated = await Promise.all(newStores.map(async p => {
      const newProduct = this.orderStoreRepository.create(p)
      return this.orderStoreRepository.save(newProduct)
    }))

    const newOrder = this.repository.create({
      freezePurchaser: foundUser,
      invoiceType: InvoiceTypes.credit,
      address: foundAddress,
      creditCard: foundCreditCard,
      ordersStore: newStoresCreated,
      purchaser: foundUser,
    })

    return await this.repository.save(newOrder)
  }

  async createOrder(userId: string, dto: OrderDto): Promise<OrderEntity> {
    const [foundUser, foundAddress] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.addressRepository.findOne({ id: dto.address.id }),
    ])

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado')

    if (!foundAddress)
      throw new NotFoundException('endereço não encontrado')

    const newProducts = await Promise.all(dto.orderProducts.map(async p => {
      const newProduct = this.orderProductRepository.create({ ...p, freezeProduct: p, user: p.product.user })
      return await this.orderProductRepository.save(newProduct)
    }))

    const userIds = newProducts.map(p => p.user.id)
    const uniqueIds = Array.from(new Set(userIds))

    const newStores: OrderStoreEntity[] = []

    uniqueIds.map((userId, index) => {
      newStores[index] = new OrderStoreEntity()
      newStores[index].products = []
      newStores[index].totalAmount = 0
      newProducts.map(product => {
        if (product.user.id === userId) {
          newStores[index].totalAmount += product.netAmount;
          newStores[index].products.push(product)
          newStores[index].store = product.user
        }
      })
    })

    const newStoresCreated = await Promise.all(newStores.map(async p => {
      const newProduct = this.orderStoreRepository.create(p)
      return this.orderStoreRepository.save(newProduct)
    }))

    const newOrder = this.repository.create({
      freezePurchaser: foundUser,
      invoiceType: InvoiceTypes.credit,
      address: foundAddress,
      ordersStore: newStoresCreated,
      purchaser: foundUser,
    })

    return await this.repository.save(newOrder)
  }

  async find(query: FindOrderDto, userId: string): Promise<[OrderEntity[], number]> {
    const { skip, take, relations, orderBy, select, where } = query;

    return await this.repository.findAndCount({
      where: {
        ...where,
        purchaser: { id: userId }
      },
      order: orderBy,
      skip, take, relations: [...relations, ], select,
    });
  }
}
