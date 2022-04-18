import { UserEntity } from '@/auth/entities/user';
import { TypeormConfig } from '@app/common';
import { JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity]), TypeormConfig],
  controllers: [ProductController],
  providers: [ProductService, JwtStrategy],
})
export class ProductModule {}
