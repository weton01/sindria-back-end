import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { VariationEntity } from '@/inventory/variation/entities/variation';
import { ProductEntity } from '@/product/entities/product';
import { JwtConfig, JwtStrategy, TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from './entities/order';
import { OrderProductEntity } from './entities/order-product';
import { OrderStoreEntity } from './entities/order-store';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      OrderEntity,
      VariationEntity,
      CreditCardEntity,
      AddressEntity,
      OrderProductEntity,
      OrderStoreEntity,
      MutationEntity,
      ProductEntity,
    ]),
    TypeormConfig,
    JwtConfig,
  ],
  controllers: [OrderController],
  providers: [OrderService, JwtStrategy],
})
export class OrderModule {}
