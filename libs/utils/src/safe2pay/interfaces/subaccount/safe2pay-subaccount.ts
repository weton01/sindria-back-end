import { Safe2PayMerchantSplit } from './safe2pay-merchant';
import { Safe2PayBankAccount } from '../safe2pay-bankaccount';

export interface Safe2PaySubAccount {
  Id: number;
  Name: string;
  CommercialName: string;
  Identity: string;
  ResponsibleName: string;
  ResponsibleIdentity: string;
  ResponsiblePhone: string;
  Email: string;
  TechName: string;
  TechIdentity: string;
  TechEmail: string;
  TechPhone: string;
  BankData: Safe2PayBankAccount;
  Address: {
    ZipCode: string;
    Street: string;
    Number: string;
    Complement: string;
    District: string;
    CityName: string;
    StateInitials: string;
    CountryName: string;
  };
  MerchantSplit: Safe2PayMerchantSplit[];
}
