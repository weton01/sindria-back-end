import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { ProductEntity } from '@/product/entities/product';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber, 
  IsString, 
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { OrderProductEntity } from '../entities/order-product';
import { OrderProductDto } from './order-product';

class AuxSingleDto {
  @ApiProperty({
    example: '12134-455ffd',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class OrderStoreDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  shippingAmount: number;
  
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  store: ProductEntity;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  orderProducts: OrderProductEntity[];
}
