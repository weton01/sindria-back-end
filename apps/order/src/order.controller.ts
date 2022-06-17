import { InvoiceTypes } from '@app/common/enums/invoice-types';
import { JwtAuthGuard } from '@app/utils';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FindOrderDto } from './dtos/find';
import { OrderDto } from './dtos/order';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createOrder(@Req() req, @Body() dto: OrderDto): Promise<any> {
    const { user } = req;

    if (dto.invoiceType === InvoiceTypes.credit)
      return await this.orderService.createCreditCardOrder(user.id, dto);
    else 
      return await this.orderService.createOrder(user.id, dto);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getOrders(@Req() req, @Query() query: FindOrderDto): Promise<any> {
    const { user } = req;

    const [items, count] = await this.orderService.find(query, user.id);
    return { items, count };
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(@Req() req, @Param('id') id): Promise<any> {
    const { user } = req;

    const order = await this.orderService.findById(user.id, id);
    return order;
  }
}
