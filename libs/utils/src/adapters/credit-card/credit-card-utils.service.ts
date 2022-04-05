
import { Injectable } from '@nestjs/common';

@Injectable()
export class  CreditCardUtilsService {
  constructor() {}

  static mask(number: string){
    return number.replace(/.(?=.{4})/g, "#");
  }
}