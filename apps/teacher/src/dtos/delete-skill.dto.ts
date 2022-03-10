import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteSkillDto {
  @IsString()
  id: string;
}
