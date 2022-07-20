import { AddressEntity } from '@/address/entities/address';

class AuxSingleDto {
  id: string;
}

class LegalRepresentative {
  name: string;

  document: string;

  birthDate: Date;

  motherName: string;
}

class CompanyMembers {
  name: string;

  document: string;

  birthDate: Date;
}

export class StoreDto {
  images: string[];

  name: string;

  document: string;

  phone: string;

  businessArea: number;

  linesOfBusiness: string;

  cnae: string;

  monthlyIncomeOrRevenue: number;

  address: AddressEntity;
}
