import { FormationEntity, TeacherEntity } from '@app/common';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFormationDto {  
  @IsString()
  @IsNotEmpty()
  name: string;
 
  @IsOptional()
  teacher: TeacherEntity;
  
  @IsOptional()
  experience: FormationEntity;
}
