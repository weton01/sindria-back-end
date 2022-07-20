import { Injectable, Inject } from '@nestjs/common';
import { Safe2PayAccEntity } from './entities/acc';
import { Safe2PayPaymentEntity } from './entities/payment';
import { Safe2PaySubAccountEntity } from './entities/subaccount';
import { Safe2PayTransactionEntity } from './entities/transaction';
import { OptionsSafe2Pay } from './interfaces/safe2pay-options';

@Injectable()
export class Safe2PayService {
  protected X_API_KEY: string;
  protected URL: string;
  public subAccount: Safe2PaySubAccountEntity;
  public payment: Safe2PayPaymentEntity;
  public acc: Safe2PayAccEntity;
  public transaction: Safe2PayTransactionEntity;

  constructor(
    @Inject('CONFIG_OPTIONS')
    options: OptionsSafe2Pay,
  ) {
    if (!options.X_API_KEY) {
      throw new Error('X_API_KEY of Juno is required');
    }

    this.subAccount = new Safe2PaySubAccountEntity(options);
    this.payment = new Safe2PayPaymentEntity(options);
    this.transaction = new Safe2PayTransactionEntity(options);
    this.acc = new Safe2PayAccEntity(options);

    this.X_API_KEY = options.X_API_KEY;
    this.URL = 'https://api.safe2pay.com.br/v2';
  }
}
