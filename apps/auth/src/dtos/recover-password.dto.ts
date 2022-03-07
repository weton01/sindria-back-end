import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RecoverPasswordDto {
  @ApiProperty({
    example: 'any_email@mail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
