import { AsaasCompanyType } from "../enums/company-type";

export interface AsaasCreateDigitalCC {
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
}