import { JwtAuthGuard } from '@app/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  @Get('/')
  async findProduct(@Query() query: FindProductDto): Promise<any> {
    const [items, count, filter] = await this.productService.filter(query);

    return { items, count, ...filter };
  }

  @Get('/creation/:id')
  async findProductInCreationById(@Param('id') id: string): Promise<any> {
    return await this.productService.findOnCreation(id);
  }

  @Get('/single/:id')
  async findProductById(@Param('id') id: string): Promise<any> {
    return await this.productService.findById(id);
  }

  @Get('/home/superstore')
  async findProductHome(): Promise<any> {
    return await this.productService.findHome();
  }

  @Get('/navbar/:name')
  async findProductNavbar(
    @Query() params: any,
    @Param('name') name: string,
  ): Promise<any> {
    return await this.productService.findNavbar(name, params);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/s3/assign-url')
  @HttpCode(200)
  async assignUrl(): Promise<any> {
    const url = await this.productService.assignUrl();

    return { url };
  }
}
