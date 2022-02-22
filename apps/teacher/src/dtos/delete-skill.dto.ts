import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteSkillDto { 
  @IsString() 
  _id: string;
}
