import { AddressEntity } from '@/address/entities/address';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { InvoiceTypes } from '@app/common/enums/invoice-types';
import { AsaasBillingType } from '@app/utils/asaas/enums/charge';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { OrderStoreEntity } from '../entities/order-store';
import { OrderStoreDto } from './orderStore';

class AuxSingleDto {
  @ApiProperty({
    example: '12134-455ffd',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class ExtraCreditCard {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cpfCnpj?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  postalCode?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  addressNumber?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mobilePhone?: string;
}

export class OrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  address: AddressEntity;

  @IsOptional()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  creditCard: CreditCardEntity;

  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ExtraCreditCard)
  extraCreditCard: ExtraCreditCard;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderStoreDto)
  orderStores: OrderStoreEntity[];

  @IsEnum(AsaasBillingType)
  @IsNotEmpty()
  invoiceType: AsaasBillingType;
}
