import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('boolean', { default: false })
  teacherConfirmation: boolean;

  @Column('boolean', { default: false })
  userConfirmation: boolean;

  @Column({ type: 'datetime' })
  beginDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor(entity?: Partial<TaskEntity>) {
    this.id = entity?.id;
  }
}
