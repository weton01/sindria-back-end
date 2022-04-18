import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TagDto {
  @ApiProperty({
    example: 'any_name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
