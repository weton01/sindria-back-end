import { AuthService } from '@/auth/services';
import { FilterDto } from '@app/common';
import { JwtAuthGuard } from '@app/utils/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/post/create-post.dto';
import { UpdatePostDto } from '../dtos/post/update-post.dto';
import { PostService } from '../services';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createPost(@Req() req, @Body() postDto: CreatePostDto): Promise<any> {
    const { user } = req;

    postDto.user = user;

    return await this.postService.create(postDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updatePost(
    @Req() req,
    @Param('id') id: string,
    @Body() postDto: UpdatePostDto,
  ): Promise<any> {
    const { user } = req;

    const foundPost = await this.postService.findById(id);

    if (!foundPost) {
      const strErr = 'post não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    if (foundPost.user.id !== user.id) {
      const strErr = 'você não tem permissões para executar essa operação';
      throw new HttpException(strErr, HttpStatus.FORBIDDEN);
    }

    return await this.postService.update(id, postDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/like/:id')
  async likePost(@Req() req, @Param('id') id: string): Promise<any> {
    const { user } = req;

    const [foundPost, foundUser] = await Promise.all([
      this.postService.findById(id),
      this.authService.findById(user.id),
    ]);

    const alreadyLike = foundPost?.likes?.find(
      (item) => item.id === foundUser.id,
    );

    if (!foundPost) {
      const strErr = 'post não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    if (alreadyLike) {
      const strErr = 'usuário já gostou deste post';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    foundPost.likes = [...foundPost.likes, foundUser];

    return await this.postService.save(foundPost);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/dislike/:id')
  async dislikePost(@Req() req, @Param('id') id: string): Promise<any> {
    const { user } = req;

    const [foundPost, foundUser] = await Promise.all([
      this.postService.findById(id),
      this.authService.findById(user.id),
    ]);

    if (!foundPost) {
      const strErr = 'post não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    foundPost.likes = foundPost.likes.filter(
      (item) => item.id !== foundUser.id,
    );

    return await this.postService.save(foundPost);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/share/:id')
  async sharePost(@Req() req, @Param('id') id: string): Promise<any> {
    const { user } = req;

    const [foundPost, foundUser] = await Promise.all([
      this.postService.findById(id),
      this.authService.findById(user.id),
    ]);

    if (!foundPost) {
      const strErr = 'post não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    foundPost.shared = [...foundPost.shared, foundUser];

    return await this.postService.save(foundPost);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async filterPost(@Query() params): Promise<any> {
    return await this.postService.find(params);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getPostById(@Param('id') id: string): Promise<any> {
    const foundPost = await this.postService.findById(id);

    if (!foundPost) {
      const strErr = 'post não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    return foundPost;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(@Req() req, @Param('id') id: string): Promise<any> {
    const { user } = req;
    const foundPost = await this.postService.findById(id);

    if (foundPost.user.id !== user.id) {
      const strErr = 'você não tem permissões para executar essa operação';
      throw new HttpException(strErr, HttpStatus.FORBIDDEN);
    }

    if (!foundPost) {
      const strErr = 'post não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    await this.postService.delete(id);

    return {};
  }
}
