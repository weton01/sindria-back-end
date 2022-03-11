import { JwtConfig, TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { CommentModule } from './comment.module';
import { PostModule } from './post.module';
import { TimelineModule } from './timeline.module';

@Module({
  imports: [
    CommentModule,
    PostModule,
    TimelineModule,
    TypeormConfig,
    JwtConfig,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
