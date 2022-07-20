import { DynamicModule, Module } from '@nestjs/common';
import { OptionsSafe2Pay } from './interfaces/safe2pay-options';
import { Safe2PayService } from './safe2pay.service';

@Module({})
export class Safe2PayModule {
  static register(options: OptionsSafe2Pay): DynamicModule {
    return {
      module: Safe2PayModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        Safe2PayService,
      ],
      exports: [Safe2PayService],
    };
  }
}
