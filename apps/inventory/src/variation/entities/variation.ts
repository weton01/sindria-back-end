import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { ProductEntity } from '@/product/entities/product';
import { VariationSizes } from '@app/common/enums/variation-size';
import { VariationTypes } from '@app/common/enums/variation-type';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product_variations' })
export class VariationEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  netAmount: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({
    type: 'enum',
    enum: VariationSizes,
    nullable: true,
  })
  size?: VariationSizes;

  @Column({
    type: 'enum',
    enum: VariationTypes,
  })
  type: VariationTypes;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => ProductEntity, (product) => product.variations, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductEntity;

  @ManyToMany(() => MutationEntity, (mutation) => mutation.variations)
  mutations: MutationEntity[];

  constructor(entity?: Partial<VariationEntity>) {
    this.id = entity?.id;
  }
}
