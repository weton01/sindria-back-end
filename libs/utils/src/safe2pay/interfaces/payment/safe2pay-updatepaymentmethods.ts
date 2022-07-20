import { Safe2PayLayoutBankSlip } from '../../enums/safe2pay-layoutbankslip';
import { Safe2PayLayoutBaseCode } from '../../enums/safe2pay-layoutbasecode';
import { Safe2PayLayoutCarnet } from '../../enums/safe2pay-layoutcarnet';
import { Safe2PayPaymentMethod } from '../responses/safe2pay-payment-methodlist';

export interface Safe2PayUpdatePaymentMethodBoleto {
  PaymentMethod: PaymentMethod;
  IsEnabled: boolean;
  IsCheckedByTransaction: boolean;
  DescriptionInvoice: string;
  InstallmentLimit: number;
  Merchant: {
    IsPassOnRateDifference: boolean;
    MinorInstallmentAmount: number;
    IsImmediateAnticipation: boolean;
    DaysBeforeCancel: boolean;
  };
  LayoutBankSlip: {
    Code: Safe2PayLayoutBankSlip;
  };
  LayoutCarnet: {
    Code: Safe2PayLayoutCarnet;
  };
  EnablePaymentDue: {
    Code: Safe2PayLayoutBaseCode;
  };
  EnablePartialPayment: {
    Code: Safe2PayLayoutBaseCode;
  };
  EnableInterestAmount: {
    Code: Safe2PayLayoutBaseCode;
  };
  EnablePenaltyAmount: {
    Code: Safe2PayLayoutBaseCode;
  };
  EnableInstruction: {
    Code: Safe2PayLayoutBaseCode;
  };
  EnableMessage: {
    Code: Safe2PayLayoutBaseCode;
  };
  Messages: {
    message: string[];
  };
  ListInstallments: {
    Amount: number;
    InitialInstallment: string;
    EndInstallment: string;
    IsCheckByTransaction: boolean;
  };
  Tax: {
    Amount: number;
    Name: string;
  };
}

export interface Safe2PayUpdatePaymentMethodCredit {
  PaymentMethod: PaymentMethod;
  IsEnabled: boolean;
  InstallmentLimit: number;
  MinorInstallmentAmount: number;
  DescriptionInvoice: string;
  ListInstallments: [
    {
      InitialInstallment: string;
      EndInstallment: string;
      Amount: number;
    },
  ];
  IsImmediateAnticipation: boolean;
  Merchant: {
    IsPassOnRateDifference: boolean;
  };
}

export interface Safe2PayUpdatePaymentMethodDebit {
  PaymentMethod: PaymentMethod;
  IsEnabled: boolean;
  DescriptionInvoice: string;
}

export interface Safe2PayUpdatePaymentMethodCrypt {
  PaymentMethod: PaymentMethod;
  IsEnabled: boolean;
}

export interface Safe2PayUpdatePaymentMethodPix {
  PaymentMethod: PaymentMethod;
  IsEnabled: boolean;
}

export interface Safe2PayUpdatePaymentMethodTed {
  PaymentMethod: PaymentMethod;
  IsEnabled: boolean;
}

export interface Safe2PayUpdatePaymentMethodAntecipation {
  PaymentMethod: PaymentMethod;
  IsEnabled: boolean;
}

export interface Safe2PayUpdatePaymentMethodAntFraud {
  PaymentMethod: PaymentMethod;
  IsEnabled: boolean;
  IsCheckByTransaction: false;
}

interface PaymentMethod {
  Code: Safe2PayPaymentMethod;
}
