import { VariationEntity } from '@/inventory/variation/entities/variation';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsInt,
  ValidateNested,
  IsUUID,
  IsArray,
} from 'class-validator';

class AuxSingleDto {
  @ApiProperty({
    example: '12134-455ffd',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class MutationDto {
  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  variations: VariationEntity[];
}
