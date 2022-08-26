import { AsaasBillingType, AsaasDiscountType } from '../enums/charge';

export interface AsaasSplit {
  walletId: string;
  fixedValue?: number;
  percentualValue?: number;
}

interface AsaasChargeDefault {
  customer: string;
  billingType: AsaasBillingType;
  dueDate: string;
  value: number;
  description: string;
  externalReference: string;
  installmentCount?: number;
  installmentValue?: number;
  discount?: {
    value: number;
    dueDateLimitDays: number;
    type: AsaasDiscountType;
  };
  interest?: {
    value: number;
  };
  fine?: {
    value: number;
  };
  split?: AsaasSplit[];
}

export interface AsaasCreateChargeBoleto extends AsaasChargeDefault {
  postalService?: boolean;
}

export interface AsaasCreateChargePix extends AsaasChargeDefault {
  postalService?: boolean;
}

export interface AsaasCreateChargeCredit extends AsaasChargeDefault {
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo?: {
    name?: string;
    email?: string;
    cpfCnpj?: string;
    postalCode?: string;
    addressNumber?: string;
    phone?: string;
    mobilePhone?: string;
  };
  creditCardToken?: string;
}
