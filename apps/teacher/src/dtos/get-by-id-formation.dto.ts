import { IsString, IsNotEmpty } from 'class-validator';

export class GetByIdFormationDto { 
  @IsString()
  @IsNotEmpty()
  id: string;
}
