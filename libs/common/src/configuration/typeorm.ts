import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '.';
import { UserEntity, TeacherEntity, SkillEntity } from '../entities';

export const TypeormConfig = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: `${envs.MONGO_URI}`,
  entities: [UserEntity, TeacherEntity, SkillEntity],
  ssl: true,
  authSource: 'admin',
});
