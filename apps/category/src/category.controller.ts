import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create';
import { CreateSubCategoryDto } from './dtos/create-sub';
import { UpdatetegoryDto } from './dtos/update';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async getCategoeries(): Promise<any> {
    return await this.categoryService.find()
  }

  @Get('/:id')
  async getCategoryById(@Param('id') id): Promise<any> {
    return await this.categoryService.findById(id)
  }

  @Post()
  async createCategory(@Body() dto: CreateCategoryDto): Promise<any> {
    return await this.categoryService.create(dto)
  }

  @Post('/:id')
  async createSubCategory(@Param('id') id, @Body() dto: CreateSubCategoryDto): Promise<any> {
    return await this.categoryService.createSub(id, dto)
  }

  @Patch('/:id')
  async updateCategory(@Param('id') id, @Body() dto: UpdatetegoryDto) {
    return await this.categoryService.update(id, dto)
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id) {
    return await this.categoryService.delete(id)
  }
}
