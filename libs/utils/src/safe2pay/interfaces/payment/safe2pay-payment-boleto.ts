import { Safe2PayBoletoPaymentObject } from './paymentObjects/safe2pay-payment-paymentobject-boleto';
import { Safe2PayPayment } from './safe2pay-payment';

export interface Safe2PayPaymentBoleto extends Safe2PayPayment {
  PaymentObject: Safe2PayBoletoPaymentObject;
}
