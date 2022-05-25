import { UserEntity } from '@/auth/entities/user';
import { ProductEntity } from '@/product/entities/product';
import { JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationEntity } from './entities/variation';
import { VariationController } from './variation.controller';
import { VariationsService } from './variation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProductEntity, VariationEntity]),
  ],
  controllers: [VariationController],
  providers: [VariationsService, JwtStrategy],
})
export class VariationModule {}
