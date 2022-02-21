import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, TeacherEntity } from '@app/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherEntity, UserEntity]),

  ],
  controllers: [],
  providers: [],
})
export class FormationModule {}
