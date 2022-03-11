import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { RangeSchemaDto } from '../../../../libs/common/src/dtos/range-schema.dto';
import { TeacherEntity } from '../entities';

export class CreateFormationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  teacher: TeacherEntity;

  @ValidateNested()
  @Type(() => RangeSchemaDto)
  range: RangeSchemaDto;
 
}
