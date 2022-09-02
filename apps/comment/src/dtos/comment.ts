import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { CommentEntity } from '../entities/comment';

export class CommentDto {
  @ApiProperty({
    description: 'the url of images',
    example: 'https://any_image.com',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  reply?: CommentEntity;

  @IsOptional()
  parent?: CommentEntity;
}
