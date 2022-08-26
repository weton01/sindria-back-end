import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { ProductEntity } from '@/product/entities/product';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
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

export class OrderProductDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  netAmount: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  grossAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  product: ProductEntity;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  mutation: MutationEntity;
}
