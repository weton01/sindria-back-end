import { UserEntity } from '@/auth/entities/user';
import { JwtConfig, TypeormConfig, JwtStrategy } from '@app/common';
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
