import { RangeSchemaDto } from '@app/common';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { TeacherEntity } from '../entities';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  teacher: TeacherEntity;

  @ValidateNested()
  @Type(() => RangeSchemaDto)
  range: RangeSchemaDto;
}
