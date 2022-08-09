import { DynamicModule, Module } from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { AsaasOptions } from './option';

@Module({})
export class AsaasModule {
  static register(options: AsaasOptions): DynamicModule {
    return {
      module: AsaasModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        AsaasService,
      ],
      exports: [AsaasService],
    };
  }
}
