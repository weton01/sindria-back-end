import { UserEntity } from '@/auth/entities/user';
import { OrderProductEntity } from '@/order/entities/order-product';
import { ProductEntity } from '@/product/entities/product';
import { MessageErrors } from '@app/utils/messages';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dtos/create';
import { FindReviewDto } from './dtos/find';

import { ReviewEntity } from './entities/review';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly repository: Repository<ReviewEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OrderProductEntity)
    private readonly orderProductRepository: Repository<OrderProductEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) { }

  private async updateReviewProduct(
    product: ProductEntity,
  ): Promise<ProductEntity> {
    const newMean = await this.repository
      .createQueryBuilder('r')
      .select(['AVG(r.rating) as avgRating'])
      .where(`r.product = '${product.id}'`)
      .getRawOne();

    product.reviewsQuantity += 1;
    product.rating = newMean.avgRating;

    return this.productRepository.save(product);
  }

  async create(
    userId: string,
    orderProductId: string,
    dto: CreateReviewDto,
  ): Promise<ReviewEntity> {
    const [foundUser, foundOrderProduct, foundReview] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.orderProductRepository.findOne({
        where: {
          id: orderProductId,
        },
        relations: ['product'],
      }),
      this.repository.findOne({
        where: {
          user: { id: userId },
          orderProduct: { id: orderProductId },
        },
        relations: ['user', 'orderProduct'],
      }),
    ]);

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    if (!foundOrderProduct)
      throw new NotFoundException('ordem de produto não encontrada');

    if (foundReview)
      throw new ConflictException(
        'avaliação já feita para este produto desta compra',
      );

    const product: ProductEntity = foundOrderProduct.product;

    const tempReview = await this.repository.create({
      ...dto,
      user: foundUser,
      product: product,
      orderProduct: foundOrderProduct,
    });

    const review = await this.repository.save(tempReview);
    await this.updateReviewProduct(product);

    return review;
  }

  async delete(userId: string, id: string): Promise<any> {
    const [foundUser, foundReview] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.repository.findOne({ where: { id }, relations: ['user'] }),
    ]);

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    if (!foundReview) throw new NotFoundException('avaliação não encontrado');

    if (foundReview.user.id !== foundUser.id)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.delete(id);

    return {};
  }

  async find(query: FindReviewDto, productId: string): Promise<[ReviewEntity[], number]> {
    const { skip, take, relations, orderBy, select, where } = query;

    return await this.repository.findAndCount({
      order: orderBy,
      skip,
      take,
      relations,
      select,
      where: { ...where, product: { id: productId } },
    });
  }
}
