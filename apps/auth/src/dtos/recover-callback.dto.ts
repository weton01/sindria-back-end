import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RecoverCallbackDto {
  @ApiProperty({
    example: 'any_password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
