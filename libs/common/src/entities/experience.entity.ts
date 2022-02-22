import {
  Entity,
  ObjectIdColumn,
  Column, 
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TeacherEntity } from '.';
import { RangeSchema } from '.';

@Entity({ name: 'experiences' })
export class ExperienceEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  range: RangeSchema;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.experiences)
  teacher: TeacherEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(entity?: Partial<TeacherEntity>) {
    this._id = entity?._id;
  }
}
