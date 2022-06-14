import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ShippingDto } from './dtos/shipping';
import { ShippingService } from './shipping.service';

@Controller()
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('/')
  async getShippingPrice(
    @Body() dto: ShippingDto,
  ): Promise<any> {

    return await this.shippingService.getShippingPrice(dto)
  }
}
