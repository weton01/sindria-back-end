import { IsString, IsNotEmpty } from 'class-validator';

export class GetByIdSkillDto { 
  @IsString()
  @IsNotEmpty()
  _id: string;
}
