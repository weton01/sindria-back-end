import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '.';
import { UserEntity } from '../entities';

export const TypeormConfig = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: `${envs.MONGO_URI}`,
  entities: [UserEntity],
  ssl: true,
  authSource: 'admin',
});
