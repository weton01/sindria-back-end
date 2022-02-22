import { IsString } from 'class-validator';

export class DeleteFormationDto { 
  @IsString() 
  _id: string;
}
