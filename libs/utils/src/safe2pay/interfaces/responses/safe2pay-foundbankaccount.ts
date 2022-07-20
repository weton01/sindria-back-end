export interface Safe2PayGetCreditResponse {
  ResponseDetail: {
    Bank: string;
    Agency: string;
    AgencyDigit: string;
    Account: string;
    AccountDigit: string;
    Operation: string;
  };
  HasError: false;
}
