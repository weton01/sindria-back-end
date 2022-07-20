export interface Safe2PayGetCreditResponse {
  ResponseDetail: {
    IdTransaction: number;
    Token: string;
    Description: string;
    Status: number;
    Message: string;
    CreditCard: {
      CardNumber: string;
      Brand: number;
      Installments: number;
    };
  };
  HasError: false;
}
