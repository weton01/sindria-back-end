import { IsString, IsNotEmpty } from 'class-validator';

export class GetByIdExperienceDto { 
  @IsString()
  @IsNotEmpty()
  _id: string;
}
