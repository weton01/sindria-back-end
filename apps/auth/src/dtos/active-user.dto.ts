import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ActiveUserDto {
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
}
