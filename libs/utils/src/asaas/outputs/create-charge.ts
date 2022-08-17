import {
  AsaasBillingType,
  AsaasChargeStatus,
  AsaasDiscountType,
} from '../enums/charge';

export interface AsaasCreateChargeOutput {
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: string;
  subscription: string;
  installment: string;
  dueDate: string;
  value: number;
  netValue: number;
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
  split?: [
    {
      walletId: string;
      fixedValue: number;
      percentualValue: number;
    },
  ];
  billingType: AsaasBillingType;
  canBePaidAfterDueDate: boolean;
  status: AsaasChargeStatus;
  pixTransaction: string;
  description: string;
  externalReference: string;
  originalDueDate: string;
  originalValue: number;
  interestValue: number;
  confirmedDate: string;
  paymentDate: string;
  clientPaymentDate: string;
  installmentNumber: string;
  invoiceUrl: string;
  bankSlipUrl: string;
  transactionReceiptUrl: string;
  invoiceNumber: string;
  deleted: boolean;
  postalService: boolean;
  anticipated: boolean;
  chargeback: {
    status: any;
    reason: any;
  };
  refunds: [{
    dateCreated: string;
    status: any;
    value: string;
    description: string;
    transactionReceiptUrl: string;
  }]
  municipalInscription: string;
  stateInscription: string;
  canDelete: string;
  cannotBeDeletedReason: string;
  canEdit: string;
  cannotEditReason: string;
}
