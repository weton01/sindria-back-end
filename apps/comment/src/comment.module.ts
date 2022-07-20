import { UserEntity } from '@/auth/entities/user';
import { ProductEntity } from '@/product/entities/product';
import { JwtConfig, JwtStrategy, TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProductEntity, CommentEntity]),
    TypeormConfig,
    JwtConfig,
  ],
  controllers: [CommentController],
  providers: [CommentService, JwtStrategy],
})
export class CommentModule {}
