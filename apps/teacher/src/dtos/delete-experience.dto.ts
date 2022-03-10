import { IsString } from 'class-validator';

export class DeleteExperienceDto {
  @IsString()
  id: string;
}
