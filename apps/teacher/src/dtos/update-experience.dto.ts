import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { TeacherEntity } from '../entities';

export class UpdateExperienceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  teacher: TeacherEntity;
}
