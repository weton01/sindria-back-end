export interface Safe2PayBoletoPaymentObject {
  DueDate: Date;
  Instruction: string;
  Message: string[];
  PenaltyRate: number;
  InterestRate: number;
  CancelAfterDue: boolean;
  DaysBeforeCancel: number;
  IsEnablePartialPayment: boolean;
  DiscountAmount: number;
  DiscountType: number;
  DiscountDue: Date;
}
