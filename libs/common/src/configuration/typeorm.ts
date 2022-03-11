import { UserEntity } from '@/auth/entities';
import { TaskEntity } from '@/calendar/entities';
import {
  ExperienceEntity,
  FormationEntity,
  SkillEntity,
  TeacherEntity,
} from '@/teacher/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity, PostEntity } from 'apps/timeline/src/entities';
import { envs } from '.';

export const TypeormConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: envs.DB_CONNECTION_HOST,
  port: parseInt(envs.DB_CONNECTION_PORT),
  username: envs.DB_CONNECTION_USERNAME,
  password: envs.DB_CONNECTION_PASSWORD,
  database: 'development',
  synchronize: true,
  entities: [
    UserEntity,
    TeacherEntity,
    SkillEntity,
    FormationEntity,
    ExperienceEntity,
    TaskEntity,
    PostEntity,
    CommentEntity,
  ],
});
