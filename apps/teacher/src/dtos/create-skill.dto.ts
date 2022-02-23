import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { FormationEntity, TeacherEntity } from '../entities';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  teacher: TeacherEntity;

  @IsOptional()
  experience: FormationEntity;
}
