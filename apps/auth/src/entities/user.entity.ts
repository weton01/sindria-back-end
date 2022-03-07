import { TaskEntity } from '@/calendar/entities';
import { TeacherEntity } from '@/teacher/entities';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty()
  @ObjectIdColumn()
  _id: string;

  @ApiProperty({
    description: 'the name of user',
    example: 'any_username',
  })
  @Column()
  username: string;

  @ApiProperty({
    description: 'the name of user',
    example: 'any_email@mail.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @ApiHideProperty()
  @Column({ length: 4 })
  activationCode: string;

  @ApiHideProperty()
  @Column('boolean', { default: false })
  active: boolean;

  @ApiProperty()
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at?: Date;

  @ApiHideProperty()
  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @ApiHideProperty()
  @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  teacher: TeacherEntity;

  
  constructor(entity?: Partial<UserEntity>) {
    this._id = entity?._id;
    this.username = entity?.username;
    this.email = entity?.email;
    this.activationCode = entity?.activationCode;
    this.active = entity?.active;
    this.tasks = entity?.tasks;
    this.teacher = entity?.teacher;
  }
}
