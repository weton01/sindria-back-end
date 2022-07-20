import { Injectable } from '@nestjs/common';

@Injectable()
export class CreditCardUtilsService {
  static mask(number: string) {
    return number.replace(/.(?=.{4})/g, '#');
  }
}
