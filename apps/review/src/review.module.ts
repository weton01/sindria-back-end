import { UserEntity } from '@/auth/entities/user';
import { OrderProductEntity } from '@/order/entities/order-product';
import { ProductEntity } from '@/product/entities/product';
import { envs, JwtStrategy, TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from 'nestjs-s3';
import { ReviewEntity } from './entities/review';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
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
  controllers: [ReviewController],
  providers: [ReviewService, JwtStrategy],
})
export class ReviewModule {}
