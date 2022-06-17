import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { JwtConfig, TypeormConfig } from '@app/common';
import { JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './entities/store';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity, 
      AddressEntity,
      StoreEntity, 
    ]),
    TypeormConfig,
    JwtConfig,
  ],
  controllers: [StoreController],
  providers: [StoreService, JwtStrategy],
})
export class StoreModule { }
