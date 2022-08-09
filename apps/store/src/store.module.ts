import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { envs, JwtConfig, JwtStrategy, TypeormConfig } from '@app/common';
import { AsaasModule } from '@app/utils/asaas/asaas.module';
import { AsaasMode } from '@app/utils/asaas/enums/asaas-mode';
import { JunoEnvMode, JunoModule } from '@app/utils/juno/juno.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationEntity } from './entities/integration';
import { StoreEntity } from './entities/store';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AddressEntity, StoreEntity, IntegrationEntity]),
    AsaasModule.register({
      MODE: AsaasMode.dev,
      X_API_KEY: envs.ASAAS_TOKEN
    }),
    TypeormConfig,
    JwtConfig,
  ],
  controllers: [StoreController],
  providers: [StoreService, JwtStrategy],
})
export class StoreModule {}
