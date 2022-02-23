import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteTeacherDto {
  @IsString()
  _id: string;
}
