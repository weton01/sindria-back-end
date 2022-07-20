import { Safe2PayPayment } from '../payment/safe2pay-payment';

export interface Safe2PayListTransactionsResponse {
  ResponseDetail: {
    TotalItems: number;
    Objects: Safe2PayPayment[];
  };
  HasError: false;
}
