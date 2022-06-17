import { DynamicModule, Module } from '@nestjs/common';
import { JunoService } from './juno.service';

enum JunoEnvMode {
  dev = "dev",
  prod = "prod",
}

export interface OptionsJuno {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  MODE: JunoEnvMode;
  TOKEN: string;
}

@Module({})
export class JunoModule {
  static register(options: OptionsJuno): DynamicModule {
    return {
      module: JunoModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        JunoService,
      ],
      exports: [JunoService],
    };
  }
}
