import { RangeSchemaDto } from '@app/common';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator'; 

export class CreateSkillDto {
  @IsString()
  @IsOptional()
  _id: string; 

  @IsString()
  @IsNotEmpty()
  name: string; 
  
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RangeSchemaDto)
  range: RangeSchemaDto;
}
