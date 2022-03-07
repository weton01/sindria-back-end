import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({
    example: 'any_email@mail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'any_password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
