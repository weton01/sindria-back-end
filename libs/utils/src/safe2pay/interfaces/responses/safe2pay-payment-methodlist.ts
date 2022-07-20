export interface Safe2PayPaymentMethodListResponse {
  ResponseDetail: Safe2PayPaymentMethod[];
  HasError: boolean;
}

export interface Safe2PayPaymentMethod {
  PaymentMethod: {
    Code: number;
    Name: string;
  };
  IsEnabled: boolean;
  InstallmentLimit: number;
  MinorInstallmentAmount: number;
  IsInstallmentEnable: boolean;
}
