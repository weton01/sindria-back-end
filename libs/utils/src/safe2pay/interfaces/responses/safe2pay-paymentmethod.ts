export interface Safe2PayPaymentMethodResponse {
  ResponseDetail: {
    IsEnabled: boolean;
    PaymentMethod: {
      Code: string | number;
      Name: string;
    };
    Tax: [
      {
        Amount: number;
        Name: string;
      },
    ];
    DaysBeforeCancel: number;
    LayoutBankSlip: string;
    LayoutCarnet: string;
    EnablePaymentDue: string;
    EnableInterestAmount: string;
    EnablePenaltyAmount: string;
    EnableInstruction: string;
    Instruction: string;
    EnableMessage: string;
    Messages: [
      {
        message: string;
      },
    ];
    EnablePartialPayment: string;
    EnableOptionalPayment: string;
    SpecieTypeBB: 4;
    SpecieTypeSicredi: string;
    SpecieTypeSantander: string;
  };
  HasError: boolean;
}

export interface Safe2PayPaymentMethodList2Response {
  ResponseDetail: [
    {
      IsEnabled: boolean;
      PaymentMethod: {
        Code: string | number;
        Name: string;
      };
      Tax: [
        {
          Amount: number;
          Name: string;
        },
      ];
      DaysBeforeCancel: number;
      LayoutBankSlip: string;
      LayoutCarnet: string;
      EnablePaymentDue: string;
      EnableInterestAmount: string;
      EnablePenaltyAmount: string;
      EnableInstruction: string;
      Instruction: string;
      EnableMessage: string;
      Messages: [
        {
          message: string;
        },
      ];
      EnablePartialPayment: string;
      EnableOptionalPayment: string;
      SpecieTypeBB: 4;
      SpecieTypeSicredi: string;
      SpecieTypeSantander: string;
    },
  ];
  HasError: boolean;
}
