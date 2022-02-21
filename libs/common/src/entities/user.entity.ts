import { Entity, ObjectIdColumn, Column, OneToOne } from 'typeorm';
import { TeacherEntity } from './teacher.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ length: 6 })
  activationCode: string;

  @Column({ default: false })
  active: boolean;

  @OneToOne(type => TeacherEntity, teacher => teacher.user)
  teacher: TeacherEntity;

  constructor(entity?: Partial<UserEntity>) {
    this._id = entity?._id;
    this.username = entity?.username;
    this.email = entity?.email;
    this.password = entity?.password;
  }
}
