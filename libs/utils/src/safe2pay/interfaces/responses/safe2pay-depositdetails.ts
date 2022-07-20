export interface Safe2PayDepositDetailResponse {
  ResponseDetail: {
    DepositDate: string;
    Amount: number;
    IsTransferred: boolean;
    Message: string;
    Tax: number;
    Extracts: [
      {
        PaymentMethod: {
          Code: string;
          Name: string;
        };
        Amount: number;
        Tax: number;
        Description: string;
        Reference: string;
        InstallmentCurrent: number;
        InstallmentQuantity: number;
        IdTransaction: number;
      },
    ];
    TotalItems: number;
  };
  HasError: boolean;
}
