import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, Min, Max, ValidateNested } from 'class-validator';
import { SkillEntity } from '../entities';
import { CreateSkillDto } from './create-skill.dto';

export class UpdateTeacherDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rating: number;
   
  @ValidateNested()
  @Type(() => CreateSkillDto)
  skills: SkillEntity[];
}
