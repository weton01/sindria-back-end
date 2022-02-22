 
import { TeacherEntity } from '@app/common';
import {
  IsString,
  IsNotEmpty, 
  IsOptional,
} from 'class-validator';

export class UpdateFormationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  teacher: TeacherEntity;
}
