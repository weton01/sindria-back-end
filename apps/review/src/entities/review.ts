import { UserEntity } from '@/auth/entities/user';
import { OrderProductEntity } from '@/order/entities/order-product';
import { ProductEntity } from '@/product/entities/product';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'reviews' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('simple-array')
  images: string[];

  @Column()
  rating: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => UserEntity, (user) => user.reviews, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.reviews, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductEntity;

  @ManyToOne(
    () => OrderProductEntity,
    (orderProductEntity) => orderProductEntity.reviews,
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  orderProduct: OrderProductEntity;

  constructor(entity?: Partial<ReviewEntity>) {
    this.id = entity?.id;
  }
}
