import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class FilterDto {
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
