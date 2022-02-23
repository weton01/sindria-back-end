import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { TeacherEntity } from '../entities';

export class UpdateFormationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  teacher: TeacherEntity;
}
