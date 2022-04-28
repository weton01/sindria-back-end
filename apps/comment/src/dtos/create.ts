import { OmitType } from '@nestjs/swagger';
import { CommentDto } from './comment';

export class CreateCommentDto extends OmitType(CommentDto, [
  'parent',
  'reply',
] as const) {}
