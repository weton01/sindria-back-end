import { Safe2PayDynamicPixPaymentObject } from './paymentObjects/safe2pay-payment-paymentobject-dynamicpix';
import { Safe2PayPayment } from './safe2pay-payment';

export interface Safe2PayPaymentDynamicPix extends Safe2PayPayment {
  PaymentObject: Safe2PayDynamicPixPaymentObject;
}
