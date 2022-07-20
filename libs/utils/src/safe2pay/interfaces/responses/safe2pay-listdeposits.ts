export interface Safe2PayListDepositsResponse {
  ResponseDetail: {
    InitialDate: string;
    EndDate: string;
    AmountDeposit: number;
    AmountTax: number;
    Deposits: [
      {
        DepositDate: string;
        Amount: number;
        Tax: number;
        IsTransferred: boolean;
        Message: string;
      },
    ];
  };
  HasError: boolean;
}
