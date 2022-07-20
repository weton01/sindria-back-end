export interface Safe2PayCreditPaymentObject {
  InstallmentQuantity: number;
  IsPreAuthorization: boolean;
  IsApplyInterest: boolean;
  InterestRate: number;
  SoftDescriptor: string;
  Holder?: string;
  CardNumber?: string;
  ExpirationDate?: string;
  SecurityCode?: string;
  token?: string;
}
