import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { CategoryEntity } from '@/category/entities/category';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from 'apps/brand/src/entities/brand';
import { ProductEntity } from 'apps/product/src/entities/product';
import { envs } from '.';


export const TypeormConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: envs.DB_CONNECTION_HOST,
  port: parseInt(envs.DB_CONNECTION_PORT),
  username: envs.DB_CONNECTION_USERNAME,
  password: envs.DB_CONNECTION_PASSWORD,
  database: 'development',
  synchronize: true,
  entities: [UserEntity, AddressEntity, CategoryEntity, CreditCardEntity, BrandEntity, ProductEntity],
});
