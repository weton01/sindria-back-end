import { UserEntity } from '@/auth/entities/user';
import { OrderEntity } from '@/order/entities/order';
import { StoreEntity } from '@/store/entities/store';
import { envs, TypeormConfig } from '@app/common';
import { AsaasModule } from '@app/utils/asaas/asaas.module';
import { AsaasMode } from '@app/utils/asaas/enums/asaas-mode';
import { CypervModule } from '@app/utils/cyperv/cyperv.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillEntity } from './entities/bill';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillEntity, UserEntity, StoreEntity, OrderEntity]),
    AsaasModule.register({
      MODE: AsaasMode.dev,
      X_API_KEY: envs.ASAAS_TOKEN,
    }),
    TypeormConfig,
    CypervModule.register({
      ALGORITHM: 'aes-256-cbc',
      ENCODING: 'hex',
      IV_LENGTH: 16,
      KEY: '123qwe1231231231'!,
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule { }
