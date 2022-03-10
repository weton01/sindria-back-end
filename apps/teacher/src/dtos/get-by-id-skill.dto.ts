import { IsString, IsNotEmpty } from 'class-validator';

export class GetByIdSkillDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
