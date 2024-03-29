import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { BrandEntity } from '@/brand/entities/brand';
import { CategoryEntity } from '@/category/entities/category';
import { CommentEntity } from '@/comment/entities/comment';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { OrderEntity } from '@/order/entities/order';
import { OrderProductEntity } from '@/order/entities/order-product';
import { OrderStoreEntity } from '@/order/entities/order-store';
import { ProductEntity } from '@/product/entities/product';
import { ReviewEntity } from '@/review/entities/review';
import { TagEntity } from '@/tag/entities/tag';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationEntity } from '@/inventory/variation/entities/variation';
import { envs } from '.';
import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { StoreEntity } from '@/store/entities/store';
import { CouponEntity } from '@/coupon/entities/coupon';
import { IntegrationEntity } from '@/store/entities/integration';
import { PaymentEntity } from '@/payment/entities/payment';
import { BillEntity } from '@/payment/entities/bill';

export const TypeormConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: envs.DB_CONNECTION_HOST,
  port: parseInt(envs.DB_CONNECTION_PORT),
  username: envs.DB_CONNECTION_USERNAME,
  password: envs.DB_CONNECTION_PASSWORD,
  database: envs.NODE_ENV,
  synchronize: true,
  entities: [
    UserEntity,
    AddressEntity,
    CategoryEntity,
    CreditCardEntity,
    BrandEntity,
    ProductEntity,
    TagEntity,
    VariationEntity,
    CommentEntity,
    OrderEntity,
    OrderStoreEntity,
    OrderProductEntity,
    ReviewEntity,
    MutationEntity,
    StoreEntity,
    CouponEntity,
    IntegrationEntity,
    PaymentEntity,
    BillEntity,
  ],
});
