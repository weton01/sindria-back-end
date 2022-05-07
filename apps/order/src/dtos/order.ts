import { AddressEntity } from '@/address/entities/address';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { InvoiceTypes } from '@app/common/enums/invoice-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, IsArray, ValidateNested, IsOptional, IsEnum } from 'class-validator';
import { OrderProductEntity } from '../entities/order-product';
import { OrderProductDto } from './order-product';

class AuxSingleDto {
  @ApiProperty({
    example: '12134-455ffd'
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class OrderDto {
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  address: AddressEntity;

  @IsOptional()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  creditCard: CreditCardEntity;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  orderProducts: OrderProductEntity[];
  
  
  @IsEnum(InvoiceTypes)
  @IsNotEmpty()
  invoiceType: InvoiceTypes
}
