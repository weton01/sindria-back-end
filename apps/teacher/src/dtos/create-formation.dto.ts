import { TeacherEntity } from '@app/common';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSkillDto {  
  @IsString()
  @IsNotEmpty()
  name: string;
 
  @IsOptional()
  teacher: TeacherEntity;
}
