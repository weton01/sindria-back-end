import { UserEntity } from '@/auth/entities/user';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from 'apps/product/src/entities/product';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'comments' })
@Tree('closure-table')
export class CommentEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'the description of comment',
    example: 'lorem ipsum alore inta',
  })
  @Column()
  description: string;
 
  @TreeChildren()
  reply: CommentEntity;

  @TreeParent({ onDelete: 'CASCADE' })
  parent: CommentEntity;

  @ApiProperty()
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at?: Date;
 
  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.comments)
  product: ProductEntity;

  constructor(entity?: Partial<CommentEntity>) {
    this.id = entity?.id;
  }
}
