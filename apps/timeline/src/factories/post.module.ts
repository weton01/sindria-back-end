import { UserEntity } from '@/auth/entities';
import { AuthService } from '@/auth/services';
import { BcryptAdapter, JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from '../controllers/post.constroller';
import { PostEntity } from '../entities';
import { PostService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  controllers: [PostController],
  providers: [JwtStrategy, PostService, AuthService, BcryptAdapter],
})
export class PostModule {}
