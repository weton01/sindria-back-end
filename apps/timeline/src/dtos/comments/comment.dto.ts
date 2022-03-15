import { UserEntity } from '@/auth/entities';
import { ApiHideProperty, ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CommentEntity, PostEntity } from '../../entities';
import { AdditionalType, PostDto } from '../post/post.dto';
import { UpdatePostDto } from '../post/update-post.dto';

class PostToCommentDto extends IntersectionType(AdditionalType, UpdatePostDto) { }

export class CommentDto {
  id: string;
  @ApiProperty({
    example: 'lorem impsun dore',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsOptional()
  replys: CommentEntity[];

  @IsOptional()
  parent: CommentEntity;

  @ApiProperty()
  @IsOptional()
  post: PostEntity;

  @ApiHideProperty()
  @IsOptional()
  user: UserEntity;
}
