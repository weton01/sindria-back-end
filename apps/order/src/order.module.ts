import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { VariationEntity } from '@/inventory/variation/entities/variation';
import { BillEntity } from '@/payment/entities/bill';
import { PaymentEntity } from '@/payment/entities/payment';
import { PaymentService } from '@/payment/payment.service';
import { ProductEntity } from '@/product/entities/product';
import { StoreEntity } from '@/store/entities/store';
import { envs, JwtConfig, JwtStrategy, TypeormConfig } from '@app/common';
import { AsaasModule } from '@app/utils/asaas/asaas.module';
import { AsaasMode } from '@app/utils/asaas/enums/asaas-mode';
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
    ]),
    TypeormConfig,
    JwtConfig,
    AsaasModule.register({
      MODE: AsaasMode.dev,
      X_API_KEY: envs.ASAAS_TOKEN,
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, PaymentService, JwtStrategy],
})
export class OrderModule {}
