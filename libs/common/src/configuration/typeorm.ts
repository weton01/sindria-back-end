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
import { VariationEntity } from 'apps/inventory/src/entities/variation';
import { envs } from '.';

export const TypeormConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: envs.DB_CONNECTION_HOST,
  port: parseInt(envs.DB_CONNECTION_PORT),
  username: envs.DB_CONNECTION_USERNAME,
  password: envs.DB_CONNECTION_PASSWORD,
  database: 'development',
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
  ],
});
