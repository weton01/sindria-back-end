import { IsString, IsNotEmpty } from 'class-validator';

export class GetByIdTeacherDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
