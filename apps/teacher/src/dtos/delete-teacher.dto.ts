import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteTeacherDto {
  @IsString()
  id: string;
}
