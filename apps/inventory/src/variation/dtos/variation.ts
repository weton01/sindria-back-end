import { VariationSizes } from '@app/common/enums/variation-size';
import { VariationTypes } from '@app/common/enums/variation-type';
import { MessageErrors, RegexTypes } from '@app/common/messages';
import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  IsUrl,
  Matches,
  Min,
} from 'class-validator';

export class VariationDto {
  @ApiProperty({
    example: 'any_name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 22.5,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  netAmount: number;

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
  length: number;

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
  @IsUrl()
  @IsNotEmpty()
  images: string;

  @ApiProperty({
    example: '#000',
  })
  @Matches(RegexTypes.color, { message: MessageErrors.invalidColor })
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(VariationTypes)
  type: VariationTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(VariationSizes)
  size: VariationSizes;
}
