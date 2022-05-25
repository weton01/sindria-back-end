import { VariationEntity } from '@/inventory/variation/entities/variation';
import { ProductEntity } from '@/product/entities/product';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'mutations' })
export class MutationEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  stock: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => ProductEntity, (product) => product.mutations)
  product: ProductEntity;

  @ManyToMany(() => VariationEntity, (variation) => variation.mutations, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  variations: VariationEntity[];

  constructor(entity?: Partial<MutationEntity>) {
    this.id = entity?.id;
  }
}
