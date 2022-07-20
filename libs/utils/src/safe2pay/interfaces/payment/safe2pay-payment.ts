import { Safe2PayCustomer } from '../safe2pay-customer';
import { Safe2PayProduct } from '../safe2pay-product';
import { Safe2PaySplit } from '../safe2pay-split';
import { Safe2PayBoletoPaymentObject } from './paymentObjects/safe2pay-payment-paymentobject-boleto';
import { Safe2PayCreditPaymentObject } from './paymentObjects/safe2pay-payment-paymentobject-credit';
import { Safe2PayDebitPaymentObject } from './paymentObjects/safe2pay-payment-paymentobject-debit';
import { Safe2PayDynamicPixPaymentObject } from './paymentObjects/safe2pay-payment-paymentobject-dynamicpix';

export interface Safe2PayPayment {
  Application: string;
  Vendor: string;
  IpAddress?: string;
  CallbackUrl: string;
  PaymentMethod: string;
  Reference: string;
  Meta: any;
  Customer: Safe2PayCustomer;
  Products: Safe2PayProduct[];
  Splits: Safe2PaySplit[];
  PaymentObject:
    | Safe2PayCreditPaymentObject
    | Safe2PayBoletoPaymentObject
    | Safe2PayDebitPaymentObject
    | Safe2PayDynamicPixPaymentObject;
}
