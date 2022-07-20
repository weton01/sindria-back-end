export interface Safe2PayBankAccount {
  Bank: {
    Code: string;
  };
  AccountType: {
    Code: string;
  };
  BankAgency: string;
  BankAgencyDigit: string;
  BankAccount: string;
  BankAccountDigit: string;
}
