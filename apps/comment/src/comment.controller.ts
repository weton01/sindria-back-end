import { JwtAuthGuard } from '@app/utils';
import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:id')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Req() req,
    @Param('id') id,
    @Body() dto: CreateCommentDto,
  ): Promise<any> {
    const { user } = req;
    
    return await this.commentService.create(id, user.id, dto);
  }

  @Post('/reply/:id')
  @UseGuards(JwtAuthGuard)
  async replyComment(
    @Req() req,
    @Param('id') id,
    @Body() dto: CreateCommentDto,
  ): Promise<any> {
    const { user } = req;

    return await this.commentService.reply(  id, user.id, dto);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteComment(@Req() req, @Param('id') id): Promise<any> {
    const { user } = req;

    await this.commentService.delete(user.id, id);
    return {};
  }

}
