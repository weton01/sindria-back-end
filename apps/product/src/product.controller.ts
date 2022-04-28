import { JwtAuthGuard } from '@app/utils';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dtos/create';
import { FindProductDto } from './dtos/find';
import { UpdateProductDto } from './dtos/update';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Req() req, @Body() dto: CreateProductDto): Promise<any> {
    const { user } = req;
    
    return await this.productService.create(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateProduct(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<any> {
    const { user } = req;

    return await this.productService.update(user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteProduct(@Req() req, @Param('id') id: string): Promise<any> {
    const { user } = req;

    return await this.productService.delete(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findProduct(@Query() query: FindProductDto, @Req() req): Promise<any> {
    const { user } = req;

    const [items, count] = await this.productService.find(query, user.id);
    return { items, count }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findProductById(@Req() req, @Param('id') id: string): Promise<any> {
    const { user } = req;

    return await this.productService.findById(user.id, id);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get('/s3/assign-url')
  @HttpCode(200)
  async assignUrl(): Promise<any> {
    const url = await this.productService.assignUrl();
    
    return {url}
  }
}
