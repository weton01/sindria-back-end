export interface Safe2PaySimulatePrepaymentResponse {
  ResponseDetail: {
    AmountReceivables: number;
    AmountNetReceivables: number;
    Tax: number;
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
