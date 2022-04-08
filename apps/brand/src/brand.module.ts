import { UserEntity } from '@/auth/entities/user';
import { JwtConfig, TypeormConfig } from '@app/common';
import { JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandEntity } from './entities/brand';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BrandEntity]),
    TypeormConfig,
    JwtConfig,
  ],
  controllers: [BrandController],
  providers: [BrandService, JwtStrategy ],
})
export class BrandModule { }
