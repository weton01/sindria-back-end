import { DynamicModule, Module } from '@nestjs/common';
import { CreditCardUtilsService } from './credit-card-utils.service';

export interface OptionsCreditCard {}

@Module({})
export class CreditCardUtilsModule {
  static register(options: OptionsCreditCard): DynamicModule {
    return {
      module: CreditCardUtilsModule,
      exports: [CreditCardUtilsService],
    };
  }
}
