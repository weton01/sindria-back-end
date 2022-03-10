import { CreateTeacherDto } from '@/teacher/dtos';
import { RangeSchemaDto } from '@app/common';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';

class TeacherDtoForTask implements Partial<CreateTeacherDto> {
    id: string
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RangeSchemaDto)
  rangeSchema: RangeSchemaDto;

  @IsNotEmpty()
  
}
