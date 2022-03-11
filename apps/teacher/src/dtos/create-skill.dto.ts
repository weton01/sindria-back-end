import { RangeSchemaDto } from '@app/common';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator'; 
import { TeacherEntity } from '../entities';

export class CreateSkillDto {
  @IsString()
  @IsOptional()
  id: string; 

  @IsString()
  @IsNotEmpty()
  name: string; 
  
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RangeSchemaDto)
  range: RangeSchemaDto;

  @IsOptional()
  teacher: TeacherEntity
}
