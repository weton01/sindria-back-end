import { JwtConfig, TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { MutationModule } from './mutation/mutation.module';
import { VariationModule } from './variation/variation.module';

@Module({
  imports: [TypeormConfig, JwtConfig, VariationModule, MutationModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
