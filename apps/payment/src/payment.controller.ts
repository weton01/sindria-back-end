import { AsaasCreateWebhookCbOutput } from '@app/utils/asaas/outputs/create-webhookcb';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/charge/webhook')
  async chargeWebhook(@Body() data: AsaasCreateWebhookCbOutput): Promise<void> {
    return await this.paymentService.chargeWebhook(data);
  }
}
