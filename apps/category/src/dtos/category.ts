import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsUrl } from 'class-validator';
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
    description: 'the url of image',
    example: 'https://any_image.com',
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  subCategories?: CategoryEntity[];

  @IsOptional()
  parent?: CategoryEntity;
}
