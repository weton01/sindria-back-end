import { UserEntity } from '@/auth/entities';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from '.';

@Entity({ name: 'posts' })
export class PostEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  image: string;

  @ApiProperty()
  @ManyToMany(() => UserEntity, (user) => user.posts, { cascade: true })
  @JoinTable()
  likes: UserEntity[];

  @ApiProperty()
  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @ApiProperty()
  @ManyToMany(() => UserEntity, (user) => user.posts, { cascade: true })
  @JoinTable()
  shared: UserEntity[];

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.posts, { cascade: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ApiProperty()
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at?: Date;
}
