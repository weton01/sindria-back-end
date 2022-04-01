import { Controller, Get } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';

@Controller()
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Get()
  getHello(): string {
    return this.creditCardService.getHello();
  }
}
