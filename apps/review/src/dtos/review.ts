import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsArray,
  IsNumber,
  Min,
  Max,
  IsString,
  IsUrl,
} from 'class-validator';

export class ReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  image: string[];
}
