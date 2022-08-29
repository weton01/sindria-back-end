import { UserEntity } from '@/auth/entities/user';
import { ExtraCreditCard } from '@/order/dtos/order';
import { OrderEntity } from '@/order/entities/order';
import { OrderStoreEntity } from '@/order/entities/order-store';
import { StoreEntity } from '@/store/entities/store';
import { envs } from '@app/common';
import { AsaasService } from '@app/utils/asaas/asaas.service';
import { AsaasChargeStatus, AsaasChargeStatusWebhook } from '@app/utils/asaas/enums/charge';
import { AsaasSplit } from '@app/utils/asaas/inputs/create-charge';
import { AsaasCreateWebhookCbOutput } from '@app/utils/asaas/outputs/create-webhookcb';
import { CypervService } from '@app/utils/cyperv/cyperv.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillEntity } from './entities/bill';

@Injectable()
export class PaymentService {
  constructor(
    private readonly cypervService: CypervService,
    @InjectRepository(BillEntity)
    private readonly repository: Repository<BillEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    @InjectRepository(OrderEntity)
    private readonly asaasService: AsaasService,
  ) { }

  private calculateTotalAmount(orderStores: OrderStoreEntity[]): number {
    let totalAmount = 0;

    orderStores.forEach((os) => {
      totalAmount += os.totalAmount;
    });

    return totalAmount;
  }

  private createSplits(
    orderStores: OrderStoreEntity[],
    installments: number,
    walletId: string,
  ): AsaasSplit[] {
    const systemFee = parseFloat(envs.PAYMENT_FEE);
    const splits = orderStores.map(
      (os): AsaasSplit => ({
        walletId: os?.store?.paymentIntegration?.meta?.digitalAccount?.walletId,
        fixedValue:
          (os.totalAmount - (os.totalAmount * (0.0199 + systemFee) + 0.49)) /
          installments,
      }),
    );
    splits.push({
      walletId: walletId,
      percentualValue: systemFee * 100,
    });

    return splits;
  }

  private async getCustomerId(): Promise<{
    walletId: string;
    customer: string;
  }> {
    const user = await this.userRepository.findOne({
      where: { type: 'admin' },
      relations: ['integrations'],
    });

    if (!user) {
      throw new NotFoundException('administrador não encontrado')
    }

    const { meta } = user.integrations[0];

    return {
      walletId: meta.digitalAccount.walletId,
      customer: meta.customer.id,
    };
  }

  async createCreditCardBill(
    order: OrderEntity,
    creditCardHolderInfo: ExtraCreditCard,
    installments: number,
  ) {
    const dueDate: Date = new Date();

    const totalAmount = this.calculateTotalAmount(order.ordersStores);
    const { customer, walletId } = await this.getCustomerId();

    const split = this.createSplits(order.ordersStores, installments, walletId);

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
      customer: customer,
      description: '',
      dueDate: new Date(dueDate.setDate(dueDate.getDate() + 5)).toISOString(),
      split,
      value: totalAmount,
      externalReference: null,
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
      order: { id: order.id },
      meta: {},
    });

    return await this.repository.save(bill);
  }

  async createDebitCardBill(
    order: OrderEntity,
    creditCardHolderInfo: ExtraCreditCard,
  ) {
    const dueDate: Date = new Date();

    const totalAmount = this.calculateTotalAmount(order.ordersStores);
    const { customer, walletId } = await this.getCustomerId();

    const split = this.createSplits(order.ordersStores, 1, walletId);

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
      customer: customer,
      description: '',
      dueDate: new Date(dueDate.setDate(dueDate.getDate() + 5)).toISOString(),
      split,
      value: totalAmount,
      externalReference: 'null',
      installmentCount: 1,
      installmentValue: totalAmount / 1,
    });

    const bill = this.repository.create({
      billingType: charge.billingType,
      extenalId: charge.id,
      status: charge.status,
      dueDate: charge.dueDate,
      value: charge.value,
      installmentCount: 1,
      installmentValue: totalAmount / 1,
      order,
      meta: {},
    });

    return await this.repository.save(bill);
  }

  async createBoletoBill(order: OrderEntity, installments: number) {
    const dueDate: Date = new Date();

    const totalAmount = this.calculateTotalAmount(order.ordersStores);
    const { customer, walletId } = await this.getCustomerId();

    const split = this.createSplits(order.ordersStores, installments, walletId);

    const charge = await this.asaasService.charge.createChargeBoleto({
      billingType: order.invoiceType,
      customer,
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
    const { customer, walletId } = await this.getCustomerId();

    const split = this.createSplits(order.ordersStores, 1, walletId);

    const charge = await this.asaasService.charge.createChargePix({
      billingType: order.invoiceType,
      customer,
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
    if (data.event === AsaasChargeStatusWebhook.PAYMENT_RECEIVED) {
      const [bill] = await Promise.all([
        this.repository.findOne({
          where: { extenalId: data.payment.id },
          relations: [
            'order',
            'order.ordersStores',
            'order.ordersStores.store',
            'order.ordersStores.store.paymentIntegration'
          ]
        }),
        this.repository.update(
          { extenalId: data.payment.id },
          {
            status: AsaasChargeStatus.RECEIVED,
            webhookStatus: data.event
          },
        )
      ])

      const { order } = bill;

      await Promise.all(order.ordersStores.map(async (os) => {
        const token = os.store.paymentIntegration.meta.digitalAccount.apiKey;
        const { balance } = await this.asaasService.digitalAccount.getBalance(token);
        return this.storeRepository.update({ id: os.store.id }, { balance: balance })
      }))
    }

    else if (data.event === AsaasChargeStatusWebhook.PAYMENT_OVERDUE) {
      const [] = await Promise.all([
        this.repository.update(
          { extenalId: data.payment.id },
          { status: AsaasChargeStatus.OVERDUE },
        )
      ])
    }

    else if (data.event === AsaasChargeStatusWebhook.PAYMENT_REFUNDED) {
      const [bill] = await Promise.all([
        this.repository.findOne({
          where: { extenalId: data.payment.id },
          relations: [
            'order',
            'order.ordersStores',
            'order.ordersStores.store',
            'order.ordersStores.store.paymentIntegration'
          ]
        }),
        this.repository.update(
          { extenalId: data.payment.id },
          {
            status: AsaasChargeStatus.REFUNDED,
            webhookStatus: data.event
          },
        )
      ])

      const { order } = bill;

      await Promise.all(order.ordersStores.map(async (os) => {
        const token = os.store.paymentIntegration.meta.digitalAccount.apiKey;
        const { balance } = await this.asaasService.digitalAccount.getBalance(token);
        return this.storeRepository.update({ id: os.store.id }, { balance: balance })
      }))
    }

    else if (data.event === AsaasChargeStatusWebhook.PAYMENT_CHARGEBACK_REQUESTED) {
      const [bill] = await Promise.all([
        this.repository.findOne({
          where: { extenalId: data.payment.id },
          relations: [
            'order',
            'order.ordersStores',
            'order.ordersStores.store',
            'order.ordersStores.store.paymentIntegration'
          ]
        }),
        this.repository.update(
          { extenalId: data.payment.id },
          {
            status: AsaasChargeStatus.CHARGEBACK_REQUESTED,
            webhookStatus: data.event
          },
        )
      ])

      const { order } = bill;

      await Promise.all(order.ordersStores.map(async (os) => {
        const token = os.store.paymentIntegration.meta.digitalAccount.apiKey;
        const { balance } = await this.asaasService.digitalAccount.getBalance(token);
        return this.storeRepository.update({ id: os.store.id }, { balance: balance })
      }))
    }

    else {
      this.repository.update(
        { extenalId: data.payment.id },
        {
          webhookStatus: data.event
        },
      )
    }

  }
}
