import { UserEntity } from '@/auth/entities/user';
import { JwtConfig, JwtStrategy, TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TagEntity]),
    TypeormConfig,
    JwtConfig,
  ],
  controllers: [TagController],
  providers: [TagService, JwtStrategy],
})
export class TagModule {}
