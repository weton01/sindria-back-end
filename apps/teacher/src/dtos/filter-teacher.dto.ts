import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class FilterTeacherDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  skip: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  take: number;
}
