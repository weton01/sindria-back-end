import { AsaasCompanyType } from "../enums/company-type";

export interface AsaasCreateDigitalCCOutput {
  id: string,
  name: string,
  email: string,
  cpfCnpj: string,
  birthDate: string,
  companyType: AsaasCompanyType,
  phone: string,
  mobilePhone: string,
  address: string,
  addressNumber: string,
  complement: string,
  province: string,
  postalCode: string,
  apiKey: string,
  walletId: string,
  accountNumber: {
    agency: string,
    account: string,
    accountDigit: string,
  }
}