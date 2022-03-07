import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'any_username',
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    example: 'any_password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
