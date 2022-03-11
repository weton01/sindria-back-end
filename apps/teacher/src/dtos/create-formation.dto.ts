import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional, 
  IsDateString,
} from 'class-validator';
 
import { TeacherEntity } from '../entities';

export class CreateFormationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  teacher: TeacherEntity;

  @IsDateString()
  @IsNotEmpty()
  beginDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;
 
}
