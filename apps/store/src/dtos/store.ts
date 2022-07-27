import { AddressEntity } from '@/address/entities/address';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, ValidateNested } from 'class-validator';

class AuxSingleDto {
  @ApiProperty({
    example: '12134-455ffd',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

class AuxCodeDto {
  @ApiProperty({
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  Code: string;
}

class Safe2PayBankAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxCodeDto)
  Bank: AuxCodeDto;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxCodeDto)
  AccountType: AuxCodeDto

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  BankAgency: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  BankAgencyDigit: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  BankAccount: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  BankAccountDigit: string;
}

class Meta {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Name: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  CommercialName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Identity: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ResponsibleName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ResponsibleIdentity: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ResponsiblePhone: string;
  Email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  TechName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  TechIdentity: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  TechEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  TechPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Safe2PayBankAccountDto)
  BankData: Safe2PayBankAccountDto;
}

export class StoreDto {
  @ApiProperty()
  @IsArray()
  @IsUrl({}, {each: true})
  @IsNotEmpty()
  images: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string; 

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Meta)
  meta: Meta;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  address: AddressEntity;
}
