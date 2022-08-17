import { TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeormConfig],
  controllers: [PaymentController, ],
  providers: [PaymentService],
})
export class PaymentModule {}
