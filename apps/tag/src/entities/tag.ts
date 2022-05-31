import { ProductEntity } from '@/product/entities/product';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tags' })
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToMany(() => ProductEntity, (product) => product.tags)
  products: ProductEntity[];

  constructor(entity?: Partial<TagEntity>) {
    this.id = entity?.id;
  }
}
