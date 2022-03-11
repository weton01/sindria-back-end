import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TeacherEntity } from '.';

@Entity({ name: 'skills' })
export class SkillEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'datetime' })
  beginDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.skills,  {
    onDelete: "CASCADE",
  })
  
  @JoinColumn({ name: 'teacherId', referencedColumnName: 'id' })
  teacher: TeacherEntity;

  constructor(entity?: Partial<TeacherEntity>) {
    this.id = entity?.id;
  }
}
