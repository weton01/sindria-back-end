import { UserEntity } from '@/auth/entities/user';
import { JwtConfig, TypeormConfig } from '@app/common';
import { JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AddressEntity]),
    TypeormConfig,
    JwtConfig,
  ],
  controllers: [AddressController],
  providers: [AddressService, JwtStrategy],
})
export class AddressModule {}
