export interface Safe2PayListTransactions {
  PageNumber: string;
  RowsPerPage: string;
  CreatedDateInitial: string;
  CreatedDateEnd: string;
  PaymentDateInitial: string;
  PaymentDateEnd: string;
  AmountInitial: number;
  AmountEnd: number;
  object: {
    Id: number;
    Reference: string;
    Application: string;
    Vendor: string;
    Customer: {
      Name: string;
      Identity: string;
    };
    PaymentMethod: {
      Code: string;
    };
    TransactionStatus: {
      Code: string;
    };
  };
}
