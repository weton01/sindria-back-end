import { envs, TypeormConfig } from '@app/common';
import { AsaasModule } from '@app/utils/asaas/asaas.module';
import { AsaasMode } from '@app/utils/asaas/enums/asaas-mode';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillEntity } from './entities/bill';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillEntity]),
    AsaasModule.register({
      MODE: AsaasMode.dev,
      X_API_KEY: envs.ASAAS_TOKEN,
    }),
    TypeormConfig,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
