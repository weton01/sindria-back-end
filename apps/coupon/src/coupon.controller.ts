import { JwtAuthGuard } from '@app/utils';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponDto } from './dtos/coupon';
import { FindCouponDto } from './dtos/find';

@Controller()
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('/:id')
  @UseGuards(JwtAuthGuard)
  async createBrand(@Req() req, @Body() dto: CouponDto, @Param('id') id: string): Promise<any> {
    const { user } = req;

    return await this.couponService.create(user.id, id, dto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateBrand(
    @Req() req,
    @Param('id') id,
   ): Promise<any> {
    const { user } = req; 
    
    return await this.couponService.useCoupon(user.id, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteBrand(@Req() req, @Param('id') id): Promise<any> {
    const { user } = req;

    await this.couponService.delete(user.id, id);
    return {};
  }


  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getBrands(@Req() req, @Query() query: FindCouponDto): Promise<any> {
    const { user } = req;

    const [items, count] = await this.couponService.find(user.id, query);
    return { items, count };
  }
}
