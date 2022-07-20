import { Safe2PayDebitPaymentObject } from './paymentObjects/safe2pay-payment-paymentobject-debit';
import { Safe2PayPayment } from './safe2pay-payment';

export interface Safe2PayPaymentDebit extends Safe2PayPayment {
  PaymentObject: Safe2PayDebitPaymentObject;
}
