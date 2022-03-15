import { UserEntity } from '@/auth/entities';
import { AuthService } from '@/auth/services';
import { BcryptAdapter } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from '../controllers/comment.controller';
import { CommentEntity, PostEntity } from '../entities';
import { CommentService, PostService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, PostEntity])],
  controllers: [CommentController],
  providers: [PostService, CommentService, AuthService, BcryptAdapter],
})
export class CommentModule {}
