import { CategoryEntity } from '@/category/entities/category';
import { TagEntity } from '@/tag/entities/tag';
import { ApiProperty } from '@nestjs/swagger';
import { BrandEntity } from 'apps/brand/src/entities/brand';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsArray, IsUUID, ValidateNested } from 'class-validator';

class AuxSingleDto {
  @ApiProperty({
    example: '12134-455ffd'
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}


export class ProductDto {
  @ApiProperty({
    example: 'any_name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'lorem impsum dolent',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;

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
    example: ['https://']
  })
  @IsArray()
  @IsString({ each: true })
  images: string[]

  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  brand: BrandEntity;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  categories: CategoryEntity[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuxSingleDto)
  tags: TagEntity[];
}
