export interface Safe2PayPaymentResponse {
  ResponseDetail: {
    IdTransaction: string;
    Status: string;
    Message: string;
    Description: string;
    QrCode: string;
    Key: string;
  };
  HasError: boolean;
}
