import { UserEntity } from '@/auth/entities/user';
import { CategoryEntity } from '@/category/entities/category';
import { OrderProductEntity } from '@/order/entities/order-product';
import { ReviewEntity } from '@/review/entities/review';
import { envs, TypeormConfig } from '@app/common';
import { JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from 'nestjs-s3';
import { ProductEntity } from './entities/product';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity,
      CategoryEntity,
      OrderProductEntity,
      ReviewEntity,
      ProductEntity,
    ]),
    S3Module.forRoot({
      config: {
        accessKeyId: envs.AWS_KEY,
        secretAccessKey: envs.AWS_ACCESS_SECRET_KEY,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      },
    }),
    TypeormConfig,
  ],
  controllers: [ProductController],
  providers: [ProductService, JwtStrategy],
})
export class ProductModule {}
