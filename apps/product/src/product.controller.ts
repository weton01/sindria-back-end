import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { FindProductDto } from './dtos/find';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getHello(@Query() query: FindProductDto): string {
    return  
  }
}
