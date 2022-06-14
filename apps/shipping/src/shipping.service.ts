import { Injectable } from '@nestjs/common';
import { calcularPrecoPrazo } from 'correios-brasil/dist';
import { ShippingDto } from './dtos/shipping';

@Injectable()
export class ShippingService {
  
  async getShippingPrice(
    dto: ShippingDto,
  ): Promise<any> {
     return await calcularPrecoPrazo(dto)
  }
}
