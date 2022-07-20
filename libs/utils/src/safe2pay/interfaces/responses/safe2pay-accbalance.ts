export interface Safe2PayAccBalanceResponse {
  ResponseDetail: {
    AmountReceived: number;
    AmountPreview: number;
    AmountCanceled: number;
    AmountPreviewTotal: number;
  };
  HasError: boolean;
}
