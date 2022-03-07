import { UserEntity } from '@/auth/entities';
import { IsString, IsNotEmpty, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { ExperienceEntity, FormationEntity, SkillEntity } from '../entities';

export class CreateTeacherDto {
  @IsOptional()
  user: UserEntity;

  @IsOptional()
  skills: SkillEntity[];

  @IsOptional()
  experiences: ExperienceEntity[];
  
  @IsOptional()
  formations: FormationEntity[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rating: number;
}
