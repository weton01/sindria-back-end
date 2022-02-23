import { TeacherEntity } from '@app/common';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { RangeSchemaDto } from '../../../../libs/common/src/dtos/range-schema.dto';

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
