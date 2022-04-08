import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class BrandDto {
  @ApiProperty({
    example: 'any_name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'image_icon',
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
