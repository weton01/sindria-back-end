import { UserDto } from '@/auth/dtos/user';
import { UserEntity } from '@/auth/entities/user';
import { VariationEntity } from '@/inventory/entities/variation';
import { ProductDto } from '@/product/dtos/product';
import { ProductEntity } from '@/product/entities/product';
import { VariationSizes } from '@app/common/enums/variation-size';
import { VariationTypes } from '@app/common/enums/variation-type';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested, } from 'class-validator';

class AuxVariationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'any_name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 20.5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  grossAmount: number;

  @ApiProperty({
    example: 22.5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  netAmount: number;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  stock: number;

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
    example: 'https://url.com',
  })
  @IsOptional()
  image: string;

  @ApiProperty({
    example: '#000',
  })
  @IsOptional()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(VariationTypes)
  type: VariationTypes

  @ApiProperty()
  @IsOptional()
  size: VariationSizes

  @ApiProperty()
  @IsNotEmpty()
  created_at: string;

  @ApiProperty()
  @IsNotEmpty()
  updated_at: string;
}

class AuxUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  created_at: string;

  @ApiProperty()
  @IsNotEmpty()
  updated_at: string;
}

class AuxProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuxVariationDto)
  variations: VariationEntity;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => IntersectionType(
    OmitType(UserDto, ['activationCode', 'password'] as const),
    AuxUserDto
  ))
  user: UserEntity;

  @ApiProperty()
  @IsNotEmpty()
  created_at: string;

  @ApiProperty()
  @IsNotEmpty()
  updated_at: string;
}

class ToUnitDto extends IntersectionType(
  AuxProductDto,
  ProductDto,
) { }

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
  @Type(() => ToUnitDto)
  product: ProductEntity;
}