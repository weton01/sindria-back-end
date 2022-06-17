import { AddressEntity } from '@/address/entities/address';
import { JunoCompanyType } from '@app/utils/adapters/juno/enums/juno-company-type';
import { JunoLegalRepresentativeTypes } from '@app/utils/adapters/juno/enums/juno-legal-rep-type';
import { JunoPaymentType } from '@app/utils/adapters/juno/enums/juno-payment-type';
import { JunoCompanyMembers } from '@app/utils/adapters/juno/interfaces/company-mebers';
import { JunoLegalRepresentative } from '@app/utils/adapters/juno/interfaces/legal-representative';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray, IsEnum, IsInt, IsISO8601, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Length, Max, Min, ValidateNested
} from 'class-validator';


class AuxSingleDto {
  @ApiProperty({
    example: '12134-455ffd',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

class LegalRepresentative {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(11)
  document: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  motherName: string;

  @ApiProperty()
  @IsEnum(JunoLegalRepresentativeTypes)
  @IsNotEmpty()
  type: JunoLegalRepresentativeTypes
}


class CompanyMembers {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(11)
  document: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  birthDate: Date;
}

export class StoreDto {
  @ApiProperty({
    example: ['https://'],
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty()
  @IsEnum(JunoPaymentType)
  @IsNotEmpty()
  type: JunoPaymentType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(14)
  document: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(9999)
  @IsInt()
  businessArea: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  linesOfBusiness: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(7)
  cnae: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  monthlyIncomeOrRevenue: number;

  @ApiProperty()
  @IsEnum(JunoCompanyType)
  @IsNotEmpty()
  companyType: JunoCompanyType;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => LegalRepresentative)
  @IsNotEmpty()
  legalRepresentative: JunoLegalRepresentative;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompanyMembers)
  companyMembers: JunoCompanyMembers[]

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  @IsNotEmpty()
  address: AddressEntity;
}
