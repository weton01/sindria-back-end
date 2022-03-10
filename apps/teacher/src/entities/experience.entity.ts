import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { TeacherEntity } from '.';

@Entity({ name: 'experiences' })
export class ExperienceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'datetime' })
  beginDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.experiences)
  @JoinColumn({ name: 'teacherId', referencedColumnName: 'id' })
  teacher: TeacherEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(entity?: Partial<TeacherEntity>) {
    this.id = entity?.id;
  }
}
