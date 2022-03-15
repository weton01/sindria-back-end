import { AuthService } from '@/auth/services';
import { JwtAuthGuard } from '@app/utils/guards';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CommentDto } from '../dtos/comments/comment.dto';
import { CreateCommentDto } from '../dtos/comments/create-comment.dto';
import { UpdateCommentDto } from '../dtos/comments/update-comment.dto';
import { CommentService, PostService } from '../services';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly authService: AuthService,
    private readonly postService: PostService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async createComment(
    @Req() req,
    @Body() comment: CreateCommentDto,
    @Param('id') id: string
  ): Promise<any> {
    const { user } = req;

    const [foundUser, foundPost] = await Promise.all([
      this.authService.findById(user.id),
      this.postService.findById(id),
    ])

    if (!foundUser) {
      const strErr = 'usuário não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    if (!foundPost) {
      const strErr = 'post não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    comment.post = foundPost;
    comment.user = foundUser;

    const createdComment = await this.commentService.create(comment)

    return createdComment
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateComment(
    @Req() req,
    @Body() comment: UpdateCommentDto,
    @Param('id') id: string): Promise<any> {
    const { user } = req;

    const [foundUser, foundPost] = await Promise.all([
      this.authService.findById(user.id),
      this.postService.findById(comment.post.id),
    ])

    if (!foundUser) {
      const strErr = 'usuário não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    if (!foundPost) {
      const strErr = 'post não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }


    return await this.commentService.update(id, comment)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/reply/:id')
  async replyComment(
    @Req() req,
    @Body() comment: CreateCommentDto,
    @Param('id') id: string): Promise<any> {
    const { user } = req;

    const [foundUser, foundComment] = await Promise.all([
      this.authService.findById(user.id),
      this.commentService.findById(id),
    ])

    if (!foundUser) {
      const strErr = 'usuário não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    if (!foundComment) {
      const strErr = 'comentário não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    comment.parent =  foundComment 
    await this.commentService.save(foundComment)

    foundComment.replys  = await this.commentService.findChildrens(foundComment)
    return foundComment
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async filterComment(): Promise<any> {

  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getCommnetById(): Promise<any> { }
}
