import { DynamicModule, Module } from '@nestjs/common';
import { CypervService } from './cyperv.service';

export interface OptionsCyperv {
  ALGORITHM: string;
  ENCODING: BufferEncoding;
  IV_LENGTH: number;
  KEY: string;
}

@Module({})
export class CypervModule {
  static register(options: OptionsCyperv): DynamicModule {
    return {
      module: CypervModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        CypervService,
      ],
      exports: [CypervService],
    };
  }
}