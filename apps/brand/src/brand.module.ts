import { UserEntity } from '@/auth/entities/user';
import { JwtConfig, JwtStrategy, TypeormConfig } from '@app/common';
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
  providers: [BrandService, JwtStrategy],
})
export class BrandModule {}
