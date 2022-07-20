import { UserEntity } from '@/auth/entities/user';
import { ProductEntity } from '@/product/entities/product';
import { JwtStrategy } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariationEntity } from '../variation/entities/variation';
import { MutationEntity } from './entities/mutation';
import { MutationController } from './mutation.controller';
import { MutationService } from './mutation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      MutationEntity,
      ProductEntity,
      VariationEntity,
    ]),
  ],
  controllers: [MutationController],
  providers: [MutationService, JwtStrategy],
})
export class MutationModule {}
