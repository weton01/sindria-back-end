import { ExtraCreditCard } from '@/order/dtos/order';
import { OrderEntity } from '@/order/entities/order';
import { AsaasService } from '@app/utils/asaas/asaas.service';
import { AsaasSplit } from '@app/utils/asaas/inputs/create-charge';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    private connection: Connection,
    private readonly asaasService: AsaasService,
  ) {}
  
  async createCreditCardCharge (order: OrderEntity, creditCardHolderInfo: ExtraCreditCard) { 
    let totalAmount: number = 0;
    const dueDate: Date = new Date();

    order.ordersStores.forEach(os => {
      totalAmount += os.totalAmount;
    })

    const split: AsaasSplit[] = order.ordersStores.map(os => ({
      walletId: os?.store?.paymentIntegration?.meta?.digitalAccount?.walletId,
      fixedValue: os.totalAmount, 
    })) 
  
    const chargeBack = await this.asaasService.charge.createChargeCredit({
      creditCard: {
        ccv: order.creditCard.cvc,
        expiryMonth: order.creditCard.expirationDate.split('/')[0],
        expiryYear: order.creditCard.expirationDate.split('/')[1],
        holderName: order.creditCard.name,
        number: order.creditCard.number
      },
      creditCardHolderInfo,
      billingType: order.invoiceType,
      customer: order.ordersStores[0].store.paymentIntegration.meta.customer.id,
      description: '',
      dueDate: dueDate.setDate(dueDate.getDate() + 5).toString(),
      split,
      value: totalAmount,
      externalReference: 'null'
    });

  }
}
