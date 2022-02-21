import {
  Entity,
  ObjectIdColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TeacherEntity } from './';

@Entity({ name: 'skills' })
export class SkillEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.skills)
  teacher: TeacherEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(entity?: Partial<TeacherEntity>) {
    this._id = entity?._id;
  }
}
