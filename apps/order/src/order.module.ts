import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { VariationEntity } from '@/inventory/variation/entities/variation';
import { BillEntity } from '@/payment/entities/bill';
import { PaymentModule } from '@/payment/payment.module';
import { PaymentService } from '@/payment/payment.service';
import { ProductEntity } from '@/product/entities/product';
import { IntegrationEntity } from '@/store/entities/integration';
import { StoreEntity } from '@/store/entities/store';
import { JwtConfig, JwtStrategy, TypeormConfig } from '@app/common';
import { CypervModule } from '@app/utils/cyperv/cyperv.module';
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
      StoreEntity,
      BillEntity,
      IntegrationEntity,
    ]),
    TypeormConfig,
    JwtConfig,
    CypervModule.register({
      ALGORITHM: 'aes-256-cbc',
      ENCODING: 'hex',
      IV_LENGTH: 16,
      KEY: '123qwe1231231231'!,
    }), 
    PaymentModule
  ],
  controllers: [OrderController],
  providers: [OrderService, JwtStrategy],
})
export class OrderModule {}
