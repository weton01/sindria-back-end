import { PartialType } from '@nestjs/swagger';
import { CreditCardDto } from './credit-card';

export class UpdateCreditCardDto extends PartialType(CreditCardDto) {}
