import { UserEntity } from '@/auth/entities/user';
import { BrandEntity } from '@/brand/entities/brand';
import { CategoryEntity } from '@/category/entities/category';
import { CommentEntity } from '@/comment/entities/comment';
import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { VariationEntity } from '@/inventory/variation/entities/variation';
import { OrderProductEntity } from '@/order/entities/order-product';
import { ReviewEntity } from '@/review/entities/review';
import { TagEntity } from '@/tag/entities/tag';

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

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  grossAmount: number;

  @Column()
  netAmount: number;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewsQuantity: number;

  @Column({ default: 0 })
  salesQuantity: number;

  @Column({ default: true })
  active: boolean;

  @Column('simple-array')
  images: string[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => VariationEntity, (variation) => variation.product)
  variations: VariationEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.product)
  comments: CommentEntity[];

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  orderProducts: OrderProductEntity[];

  @OneToMany(() => MutationEntity, (mutation) => mutation.product)
  mutations: OrderProductEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];

  @ManyToOne(() => UserEntity, (user) => user.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  brand: BrandEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  momCategories: CategoryEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  tags: TagEntity[];

  constructor(entity?: Partial<ProductEntity>) {
    this.id = entity?.id;
  }
}
