export interface Safe2PayPaymentInstallmentValueList {
  ResponseDetail: {
    Installments: Safe2PayPaymentInstallmentValue[];
  };
  HasError: boolean;
}

export interface Safe2PayPaymentInstallmentValue {
  Installments: number;
  InstallmentValue: number;
  TotalValue: number;
  AppliedTax: number;
}
