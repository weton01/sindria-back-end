import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'any_username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

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
  password?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  @ApiProperty({
    description: 'The code received in e-mail',
    minLength: 4,
    maxLength: 4,
    type: String,
    example: '0000',
  })
  activationCode: string;

  @IsBoolean()
  @IsOptional()
  isGoogle?: boolean;
  
  @IsBoolean()
  @IsOptional()
  isFacebook?: boolean;
}
