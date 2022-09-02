import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsArray } from 'class-validator';
import { CategoryEntity } from '../entities/category';

export class CategoryDto {
  @ApiProperty({
    description: 'the name of category',
    example: 'any_category',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'the url of images',
    example: 'https://any_image.com',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  images: string[];

  @IsString()
  @IsOptional()
  groupName: string;

  @IsOptional()
  subCategories?: CategoryEntity[];

  @IsOptional()
  parent?: CategoryEntity;
}
