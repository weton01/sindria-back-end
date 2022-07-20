export interface Safe2PayPrepaymentReceivablesResponse {
  ResponseDetail: {
    Message: string;
    Items: [
      {
        Id: number;
        Description: string;
        InstallmentQuantity: number;
      },
    ];
  };
  HasError: boolean;
}
