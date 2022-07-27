import { CategoryEntity } from '@/category/entities/category';
import { StoreEntity } from '@/store/entities/store';
import { TagEntity } from '@/tag/entities/tag';
import { UnitMeasurement } from '@app/common/enums/unit-measurement';
import { ApiProperty } from '@nestjs/swagger';
import { BrandEntity } from 'apps/brand/src/entities/brand';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsUUID,
  ValidateNested,
  ArrayNotEmpty,
  Min,
  IsInt,
  IsEnum,
} from 'class-validator';

class AuxSingleDto {
  @ApiProperty({
    example: '12134-455ffd',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class ProductDto {
  @ApiProperty({
    example: 'any_name',
  })
  @Transform(
    ({ value }) => {
      if (value)
        return value
          .trim()
          .toLowerCase()
          .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
      return '';
    },
    { toClassOnly: true },
  )
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  weight: number;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  height: number;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  width: number;

  @ApiProperty({
    example: 'lorem impsum dolent',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  minSale: number;

  @ApiProperty()
  @IsEnum(UnitMeasurement) 
  @IsNotEmpty()
  unitMeasurement: UnitMeasurement;

  @ApiProperty({
    example: 'lorem impsum dolent',
  })
  @IsNumber()
  @IsNotEmpty()
  grossAmount: number;

  @ApiProperty({
    example: 'lorem impsum dolent',
  })
  @IsNumber()
  @IsNotEmpty()
  netAmount: number;

  @ApiProperty({
    example: ['https://'],
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  brand: BrandEntity;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  store: StoreEntity;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  categories: CategoryEntity[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  tags: TagEntity[];
}
