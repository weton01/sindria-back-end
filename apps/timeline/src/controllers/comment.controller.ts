import { Controller, Get, Patch, Post } from '@nestjs/common';
import { CommentService } from '../services';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/')
  async createComment(): Promise<any> {}

  @Patch('/:id')
  async updateComment(): Promise<any> {}

  @Patch('/reply/:id')
  async replyComment(): Promise<any> {}

  @Get('/')
  async filterComment(): Promise<any> {}

  @Get('/')
  async getCommnetById(): Promise<any> {}
}
