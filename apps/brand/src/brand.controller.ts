import { JwtAuthGuard } from '@app/utils';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/create';
import { UpdateBrandDto } from './dtos/update';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createBrand(
    @Req() req,
    @Body() dto: CreateBrandDto,
  ): Promise<any> {
    const { user } = req;
    return await this.brandService.create(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateBrand(@Req() req, @Param('id') id, @Body() dto: UpdateBrandDto): Promise<any> {
    const { user } = req;
    
    return await this.brandService.update(user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteBrand(@Req() req, @Param('id') id): Promise<any> {
    const { user } = req;

    await this.brandService.delete(user.id, id);
    return {};
  }

  @Get('/:id')
  async getCrBrandById(@Param('id') id): Promise<any> {
    return await this.brandService.findById(id);
  }

  @Get('/')
  async getBrands(): Promise<any> {
    return await this.brandService.find();
  }
}
