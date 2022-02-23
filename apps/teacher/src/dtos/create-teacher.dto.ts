import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  rating: number;
}
