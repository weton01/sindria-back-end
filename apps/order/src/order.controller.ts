import { BillEntity } from '@/payment/entities/bill';
import { PaymentService } from '@/payment/payment.service';
import { JwtAuthGuard } from '@app/utils';
import { AsaasBillingType } from '@app/utils/asaas/enums/charge';
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
import { OrderEntity } from './entities/order';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
  ) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createOrder(@Req() req, @Body() dto: OrderDto): Promise<any> {
    const { user } = req;

    if (dto.invoiceType === AsaasBillingType.CREDIT_CARD) {
      const order: OrderEntity = await this.orderService.createCreditCardOrder(
        user.id,
        dto,
      );
      const bill: BillEntity = await this.paymentService.createCreditCardBill(
        order,
        dto.extraCreditCard,
        dto.installments,
      );

      return { order, bill };
    }

    if (dto.invoiceType === AsaasBillingType.BOLETO) {
      const order: OrderEntity = await this.orderService.createBoletoOrder(
        user.id,
        dto,
      );
      const bill: BillEntity = await this.paymentService.createBoletoBill(
        order,
        dto.installments,
      );
      return { order, bill };
    }

    if (dto.invoiceType === AsaasBillingType.PIX) {
      const order: OrderEntity = await this.orderService.createPixOrder(
        user.id,
        dto,
      );
      const bill: BillEntity = await this.paymentService.createPixBill(order);
      return { order, bill };
    }
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
