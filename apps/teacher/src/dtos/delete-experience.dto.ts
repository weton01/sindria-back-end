import { IsString } from 'class-validator';

export class DeleteExperienceDto { 
  @IsString() 
  _id: string;
}
