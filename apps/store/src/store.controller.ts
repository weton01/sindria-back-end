import { FindCategoryDto } from '@/category/dtos/find';
import { JwtAuthGuard } from '@app/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StoreDto } from './dtos/store';
import { UpdateStoreDto } from './dtos/update';
import { StoreService } from './store.service';

@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() dto: StoreDto): Promise<any> {
    const { user } = req;

    return await this.storeService.create(user.id, dto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateStoreDto,
  ): Promise<any> {
    const { user } = req;

    return await this.storeService.update(user.id, id, dto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req, @Param('id') id: string): Promise<any> {
    const { user } = req;

    return await this.storeService.delete(user.id, id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@Query() query: FindCategoryDto): Promise<any> {
    const [items, count] = await this.storeService.find(query);

    return { items, count };
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<any> {
    return await this.storeService.findById(id);
  }
}
