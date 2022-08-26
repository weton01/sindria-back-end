import { AddressEntity } from '@/address/entities/address';
import { AsaasCompanyType } from '@app/utils/asaas/enums/company-type';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class AuxSingleDto {
  @ApiProperty({
    example: '12134-455ffd',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

class Meta {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cpfCnpj: string;

  @ApiProperty()
  @IsISO8601()
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty()
  @IsEnum(AsaasCompanyType)
  @IsNotEmpty()
  companyType: AsaasCompanyType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobilePhone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addressNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  complement: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  province: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postalCode: string;
}

export class StoreDto {
  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  images: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Meta)
  meta: Meta;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  address: AddressEntity;
}
