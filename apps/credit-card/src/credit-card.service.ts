import { Injectable } from '@nestjs/common';

@Injectable()
export class CreditCardService {
  getHello(): string {
    return 'Hello World!';
  }
}
