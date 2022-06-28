import { UserEntity } from '@/auth/entities/user';
import { JwtConfig, TypeormConfig } from '@app/common';
import { JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CouponEntity } from './entities/coupon';

@Module({
  imports: [    
    TypeOrmModule.forFeature([UserEntity, CouponEntity]),
    TypeormConfig,
    JwtConfig
  ],
  controllers: [CouponController],
  providers: [CouponService, JwtStrategy],
})
export class CouponModule {}
