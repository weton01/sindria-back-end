import { UserEntity } from '@/auth/entities/user';
import { VariationEntity } from '@/inventory/variation/entities/variation';
import { OrderProductEntity } from '@/order/entities/order-product';
import { ProductEntity } from '@/product/entities/product';
import { floatTransformer } from '@app/common/transformers/float';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'mutations' })
export class MutationEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  stock: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  feeTotal: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  orderProducts: OrderProductEntity[];

  @ManyToOne(() => UserEntity, (user) => user.mutations, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.mutations, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
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
