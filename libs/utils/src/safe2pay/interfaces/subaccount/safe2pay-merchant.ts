import { Safe2PayTax } from './safe2pay-taxes';

export interface Safe2PayMerchantSplit {
  PaymentMethodCode: string;
  IsSubaccountTaxPayer: boolean;
  Taxes: Safe2PayTax[];
}
