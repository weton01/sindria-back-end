import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create';
import { CreateSubCategoryDto } from './dtos/create-sub';
import { FindCategoryDto } from './dtos/find';
import { UpdatetegoryDto } from './dtos/update';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories(): Promise<any> {
    return await this.categoryService.find();
  }

  @Get('/category')
  async findCategories(@Query() query: FindCategoryDto): Promise<any> {
    const [items, count] = await this.categoryService.findCategories(query);

    return { items, count }
  }

  @Get('/sub-category')
  async findSubCategories(@Query() query: FindCategoryDto): Promise<any> {
    const [items, count] = await this.categoryService.findSubCategories(query);

    return { items, count }
  }

  @Get('/:id')
  async getCategoryById(@Param('id') id): Promise<any> {
    return await this.categoryService.findById(id);
  }

  @Post()
  async createCategory(@Body() dto: CreateCategoryDto): Promise<any> {
    return await this.categoryService.create(dto);
  }

  @Post('/sub-category/:id')
  async createSubCategory(
    @Param('id') id,
    @Body() dto: CreateSubCategoryDto,
  ): Promise<any> {
    return await this.categoryService.createSub(id, dto);
  }

  @Patch('/:id')
  async updateCategory(@Param('id') id, @Body() dto: UpdatetegoryDto) {
    return await this.categoryService.update(id, dto);
  }

  @Patch('/sub-category/:id')
  async updateSubCategory(@Param('id') id, @Body() dto: UpdatetegoryDto) {
    return await this.categoryService.updateSub(id, dto);
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id) {
    return await this.categoryService.delete(id);
  }
}
