import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { envs, JwtConfig, JwtStrategy, TypeormConfig } from '@app/common';
import { JunoEnvMode, JunoModule } from '@app/utils/juno/juno.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './entities/store';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AddressEntity, StoreEntity]),
    JunoModule.register({
      CLIENT_ID: envs.JUNO_CLIENT_ID,
      CLIENT_SECRET: envs.JUNO_CLIENT_SECRET,
      MODE: JunoEnvMode.dev,
      TOKEN: envs.JUNO_TOKEN,
    }),
    TypeormConfig,
    JwtConfig,
  ],
  controllers: [StoreController],
  providers: [StoreService, JwtStrategy],
})
export class StoreModule {}
