import { IsString, IsNotEmpty } from 'class-validator';

export class GetByIdExperienceDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
