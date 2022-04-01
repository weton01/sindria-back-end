import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@/category/entities/category';
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
    CategoryEntity
  ],
});
