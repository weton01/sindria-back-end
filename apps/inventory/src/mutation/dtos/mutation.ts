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
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  color: VariationEntity;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  size: VariationEntity;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  variation: VariationEntity;
}
