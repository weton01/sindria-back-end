import { Safe2PayCreditPaymentObject } from './paymentObjects/safe2pay-payment-paymentobject-credit';
import { Safe2PayPayment } from './safe2pay-payment';

export interface Safe2PayPaymentCredit extends Safe2PayPayment {
  PaymentObject: Safe2PayCreditPaymentObject;
}
