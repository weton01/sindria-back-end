import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsUUID, IsUrl } from 'class-validator';

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
  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  images: string[];

  @ApiProperty({
    example: 'image_icon',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;
}
