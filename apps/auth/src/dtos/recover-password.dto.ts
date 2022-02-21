import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RecoverPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
