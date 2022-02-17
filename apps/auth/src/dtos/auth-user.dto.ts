import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
