import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator'; 
import { TeacherEntity } from '../entities';

export class CreateSkillDto {
  @IsString()
  @IsOptional()
  id: string; 

  @IsString()
  @IsNotEmpty()
  name: string; 
  
  @IsDateString()
  @IsNotEmpty()
  beginDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsOptional()
  teacher: TeacherEntity
}
