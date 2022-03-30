import { TeacherEntity } from '@/teacher/entities';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CommentEntity, PostEntity } from 'apps/timeline/src/entities';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ApiHideProperty()
  @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  teacher: TeacherEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @ApiHideProperty()
  @Column({default: false})
  isGoogle: boolean;

  @ApiHideProperty()
  @Column({default: false})
  isFacebook: boolean;

  @ApiProperty()
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at?: Date;

  constructor(entity?: Partial<UserEntity>) {
    this.id = entity?.id;
    this.username = entity?.username;
    this.email = entity?.email;
    this.activationCode = entity?.activationCode;
    this.active = entity?.active;
    this.teacher = entity?.teacher;
  }
}
