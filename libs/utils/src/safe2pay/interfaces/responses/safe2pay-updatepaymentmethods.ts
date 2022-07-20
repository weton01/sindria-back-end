import { Safe2PayPaymentMethod } from '../responses/safe2pay-payment-methodlist';

export interface Safe2PayUpdatePaymentMethodBoletoResponse {
  ResponseDetail: {
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
    EnablePartialPayment: string;
    EnableOptionalPayment: string;
    SpecieTypeBB: number;
    SpecieTypeSicredi: string;
    SpecieTypeSantander: string;
    Messages: {
      message: string;
    };
    Tax: [
      {
        Amount: number;
        Name: string;
      },
    ];
  };
}

export interface Safe2PayUpdatePaymentMethodCreditResponse {
  ResponseDetail: {
    IsEnabled: boolean;
    PaymentMethod: PaymentMethod;
    Tax: [
      {
        InitialInstallment: number;
        EndInstallment: number;
        Amount: number;
        Name: string;
      },
    ];
    DescriptionInvoice: '';
    InstallmentLimit: 12;
    MinorInstallmentAmount: 5.0;
    Merchant: {
      IsPassOnRateDifference: true;
    };
    IsImmediateAnticipation: false;
  };
  HasError: false;
}

export interface Safe2PayUpdatePaymentMethodDebitResponse {
  ResponseDetail: {
    IsEnabled: true;
    PaymentMethod: PaymentMethod;
    Tax: [
      {
        Amount: number;
        Name: string;
      },
    ];
    SoftDescriptor: string;
  };
  HasError: boolean;
}

export interface Safe2PayUpdatePaymentMethodCryptResponse {
  ResponseDetail: {
    IsEnabled: true;
    PaymentMethod: PaymentMethod;
    Tax: [
      {
        Amount: number;
        Name: string;
      },
    ];
    SoftDescriptor: string;
  };
  HasError: boolean;
}

export interface Safe2PayUpdatePaymentMethodPixResponse {
  ResponseDetail: {
    IsEnabled: true;
    PaymentMethod: PaymentMethod;
    Tax: [
      {
        Amount: number;
        Name: string;
      },
    ];
    SoftDescriptor: string;
  };
  HasError: boolean;
}

export interface Safe2PayUpdatePaymentMethodTedResponse {
  ResponseDetail: {
    IsEnabled: true;
    PaymentMethod: PaymentMethod;
    Tax: [
      {
        Amount: number;
        Name: string;
      },
    ];
    SoftDescriptor: string;
  };
  HasError: boolean;
}

export interface Safe2PayUpdatePaymentMethodAntecipationResponse {
  ResponseDetail: {
    IsEnabled: true;
    PaymentMethod: PaymentMethod;
    Tax: [
      {
        Amount: number;
        Name: string;
      },
    ];
    SoftDescriptor: string;
  };
  HasError: boolean;
}

export interface Safe2PayUpdatePaymentMethodAntFraudResponse {
  ResponseDetail: {
    IsEnabled: true;
    PaymentMethod: PaymentMethod;
    Tax: [
      {
        Amount: number;
        Name: string;
      },
    ];
    SoftDescriptor: string;
    IsCheckByTransaction: false;
  };
  HasError: boolean;
}

interface PaymentMethod {
  Code: Safe2PayPaymentMethod;
}
