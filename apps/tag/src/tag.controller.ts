import { JwtAuthGuard } from '@app/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FindTagDto } from './dtos/find';
import { TagDto } from './dtos/tag';
import { TagService } from './tag.service';

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createTag(@Req() req, @Body() dto: TagDto): Promise<any> {
    const { user } = req;
    return await this.tagService.create(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteTag(@Req() req, @Param('id') id): Promise<any> {
    const { user } = req;

    await this.tagService.delete(user.id, id);
    return {};
  }

  @Get('/:id')
  async getCrTagById(@Param('id') id): Promise<any> {
    return await this.tagService.findById(id);
  }

  @Get('/')
  async getTags(@Query() query: FindTagDto): Promise<any> {
    const [items, count] = await this.tagService.find(query);
    return { items, count };
  }
}
