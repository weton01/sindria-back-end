import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, TeacherEntity, FormationEntity } from '@app/common';
import { FormationController } from '../controllers/formation.controller';
import { FormationService } from '../services/formation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherEntity, UserEntity, FormationEntity]),

  ],
  controllers: [FormationController],
  providers: [FormationService],
})
export class FormationModule {}
