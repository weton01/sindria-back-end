import { DynamicModule, Module } from '@nestjs/common';
import { CreditCardUtilsService } from './credit-card-utils.service';

@Module({})
export class CreditCardUtilsModule {
  static register(): DynamicModule {
    return {
      module: CreditCardUtilsModule,
      exports: [CreditCardUtilsService],
    };
  }
}
