import { UserEntity } from '@/auth/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 import { FormationController } from '../controllers/formation.controller';
import { FormationEntity, TeacherEntity } from '../entities';
import { FormationService } from '../services/formation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherEntity, UserEntity, FormationEntity]),

  ],
  controllers: [FormationController],
  providers: [FormationService],
})
export class FormationModule {}
