import { ExtraCreditCard } from '@/order/dtos/order';
import { OrderEntity } from '@/order/entities/order';
import { OrderStoreEntity } from '@/order/entities/order-store';
import { AsaasService } from '@app/utils/asaas/asaas.service';
import { AsaasSplit } from '@app/utils/asaas/inputs/create-charge';
import { AsaasCreateWebhookCbOutput } from '@app/utils/asaas/outputs/create-webhookcb';
import { CypervService } from '@app/utils/cyperv/cyperv.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillEntity } from './entities/bill';

@Injectable()
export class PaymentService {
  constructor(
    private readonly asaasService: AsaasService,
    private readonly cypervService: CypervService,
    @InjectRepository(BillEntity)
    private readonly repository: Repository<BillEntity>,
  ) {}

  private calculateTotalAmount(orderStores: OrderStoreEntity[]): number {
    let totalAmount = 0;

    orderStores.forEach((os) => {
      totalAmount += os.totalAmount;
    });

    return totalAmount;
  }

  private createSplits(
    orderStores: OrderStoreEntity[],
    installments,
  ): AsaasSplit[] {
    return orderStores.map((os) => ({
      walletId: os?.store?.paymentIntegration?.meta?.digitalAccount?.walletId,
      fixedValue:
        (os.totalAmount - (os.totalAmount * 0.0199 + 0.49)) / installments,
    }));
  }

  async createCreditCardBill(
    order: OrderEntity,
    creditCardHolderInfo: ExtraCreditCard,
    installments: number,
  ) {
    const dueDate: Date = new Date();

    const totalAmount = this.calculateTotalAmount(order.ordersStores);
    const split = this.createSplits(order.ordersStores, installments);

    const charge = await this.asaasService.charge.createChargeCredit({
      creditCard: {
        ccv: this.cypervService.decrypt(order.creditCard.cvc),
        expiryMonth: order.creditCard.expirationDate.split('/')[0],
        expiryYear: order.creditCard.expirationDate.split('/')[1],
        holderName: order.creditCard.name,
        number: this.cypervService.decrypt(order.creditCard.number),
      },
      creditCardHolderInfo,
      billingType: order.invoiceType,
      customer: order.ordersStores[0].store.paymentIntegration.meta.customer.id,
      description: '',
      dueDate: new Date(dueDate.setDate(dueDate.getDate() + 5)).toISOString(),
      split,
      value: totalAmount,
      externalReference: 'null',
      installmentCount: installments,
      installmentValue: totalAmount / installments,
    });

    const bill = this.repository.create({
      billingType: charge.billingType,
      extenalId: charge.id,
      status: charge.status,
      dueDate: charge.dueDate,
      value: charge.value,
      installmentCount: installments,
      installmentValue: totalAmount / installments,
      order,
      meta: {},
    });

    return await this.repository.save(bill);
  }

  async createBoletoBill(order: OrderEntity, installments: number) {
    const dueDate: Date = new Date();

    const totalAmount = this.calculateTotalAmount(order.ordersStores);
    const split = this.createSplits(order.ordersStores, installments);

    const charge = await this.asaasService.charge.createChargeBoleto({
      billingType: order.invoiceType,
      customer: order.ordersStores[0].store.paymentIntegration.meta.customer.id,
      description: '',
      dueDate: new Date(dueDate.setDate(dueDate.getDate() + 5)).toISOString(),
      split,
      value: totalAmount,
      externalReference: 'null',
      installmentCount: installments,
      installmentValue: totalAmount / installments,
      postalService: false,
    });

    const meta = await this.asaasService.charge.getBoletoBarcode(charge.id);

    const bill = this.repository.create({
      billingType: charge.billingType,
      extenalId: charge.id,
      status: charge.status,
      dueDate: charge.dueDate,
      value: charge.value,
      installmentCount: installments,
      installmentValue: totalAmount / installments,
      order,
      meta,
    });

    return await this.repository.save(bill);
  }

  async createPixBill(order: OrderEntity) {
    const dueDate: Date = new Date();

    const totalAmount = this.calculateTotalAmount(order.ordersStores);
    const split = this.createSplits(order.ordersStores, 1);

    const charge = await this.asaasService.charge.createChargePix({
      billingType: order.invoiceType,
      customer: order.ordersStores[0].store.paymentIntegration.meta.customer.id,
      description: '',
      dueDate: new Date(dueDate.setDate(dueDate.getDate() + 5)).toISOString(),
      split,
      value: totalAmount,
      externalReference: 'null',
      postalService: false,
    });

    const meta = await this.asaasService.charge.getPixQRCode(charge.id);

    const bill = this.repository.create({
      billingType: charge.billingType,
      extenalId: charge.id,
      status: charge.status,
      dueDate: charge.dueDate,
      value: charge.value,
      installmentCount: 1,
      installmentValue: totalAmount / 1,
      order,
      meta,
    });

    return await this.repository.save(bill);
  }

  async chargeWebhook(data: AsaasCreateWebhookCbOutput) {
    await this.repository.update(
      { extenalId: data.payment.id },
      { status: data.event },
    );
  }
}
