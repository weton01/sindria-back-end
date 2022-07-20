import { UserEntity } from '@/auth/entities/user';
import { JwtConfig, JwtStrategy, TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CouponEntity } from './entities/coupon';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CouponEntity]),
    TypeormConfig,
    JwtConfig,
  ],
  controllers: [CouponController],
  providers: [CouponService, JwtStrategy],
})
export class CouponModule {}
