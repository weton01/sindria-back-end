import {  IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class RangeSchemaDto {  
  @IsDateString()
  @IsNotEmpty()
  begin: string;
 
  @IsOptional()
  @IsDateString()
  end: string;
}
