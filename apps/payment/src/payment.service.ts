import { ExtraCreditCard } from '@/order/dtos/order';
import { OrderEntity } from '@/order/entities/order';
import { AsaasService } from '@app/utils/asaas/asaas.service';
import { AsaasSplit } from '@app/utils/asaas/inputs/create-charge';
import { AsaasCreateWebhookCbOutput } from '@app/utils/asaas/outputs/create-webhookcb';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { BillEntity } from './entities/bill';

@Injectable()
export class PaymentService {
  constructor(
    private connection: Connection,
    private readonly asaasService: AsaasService,
    @InjectRepository(BillEntity)
    private readonly repository: Repository<BillEntity>,
  ) {}

  async createCreditCardCharge(
    order: OrderEntity,
    creditCardHolderInfo: ExtraCreditCard,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let totalAmount = 0;
    const dueDate: Date = new Date();

    order.ordersStores.forEach((os) => {
      totalAmount += os.totalAmount;
    });

    const split: AsaasSplit[] = order.ordersStores.map((os) => ({
      walletId: os?.store?.paymentIntegration?.meta?.digitalAccount?.walletId,
      fixedValue: os.totalAmount - (os.totalAmount * 0.0199 + 0.49),
    }));

    try {
      const charge = await this.asaasService.charge.createChargeCredit({
        creditCard: {
          ccv: order.creditCard.cvc,
          expiryMonth: order.creditCard.expirationDate.split('/')[0],
          expiryYear: order.creditCard.expirationDate.split('/')[1],
          holderName: order.creditCard.name,
          number: order.creditCard.number,
        },
        creditCardHolderInfo,
        billingType: order.invoiceType,
        customer:
          order.ordersStores[0].store.paymentIntegration.meta.customer.id,
        description: '',
        dueDate: new Date(dueDate.setDate(dueDate.getDate() + 5)).toISOString(),
        split,
        value: totalAmount,
        externalReference: 'null',
      });

      const bill = this.repository.create({
        billingType: charge.billingType,
        extenalId: charge.id,
        status: charge.status,
        dueDate: charge.dueDate,
        value: charge.value,
        order,
      });

      await queryRunner.manager.save(bill);
      await queryRunner.commitTransaction();

      return bill;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async chargeWebhook(data: AsaasCreateWebhookCbOutput) {
    await this.repository.update(
      { extenalId: data.payment.id },
      { status: data.event },
    );
  }
}
