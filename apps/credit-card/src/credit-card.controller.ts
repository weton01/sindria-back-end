import { JwtAuthGuard } from '@app/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto } from './dtos/create';
import { FindCreditCardDto } from './dtos/find';

@Controller()
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createCreditCard(
    @Req() req,
    @Body() dto: CreateCreditCardDto,
  ): Promise<any> {
    const { user } = req;
    return await this.creditCardService.create(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteCreditCard(@Req() req, @Param('id') id): Promise<any> {
    const { user } = req;

    await this.creditCardService.delete(user.id, id);

    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getCreditCardById(@Param('id') id): Promise<any> {
    return await this.creditCardService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getCreditCards(
    @Query() query: FindCreditCardDto,
    @Req() req,
  ): Promise<any> {
    const { user } = req;

    const [items, count] = await this.creditCardService.find(query, user.id);
    return { items, count };
  }
}
