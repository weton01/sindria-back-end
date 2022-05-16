import { UserEntity } from '@/auth/entities/user';
import { BrandEntity } from '@/brand/entities/brand';
import { CategoryEntity } from '@/category/entities/category';
import { CommentEntity } from '@/comment/entities/comment';
import { VariationEntity } from '@/inventory/entities/variation';
import { OrderEntity } from '@/order/entities/order';
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

  @Column({ default: true })
  active: boolean;

  @Column("simple-array")
  images: string[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => VariationEntity, (variation) => variation.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  variations: VariationEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  comments: CommentEntity[];

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  orderProducts: OrderProductEntity[];
  
  @OneToMany(() => ReviewEntity, (review) => review.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  reviews: ReviewEntity[];

  @ManyToOne(() => UserEntity, (user) => user.products)
  user: UserEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  brand: BrandEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  @JoinTable()
  momCategories: CategoryEntity[];
  
  @ManyToMany(() => CategoryEntity, (category) => category.products)
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.products)
  @JoinTable()
  tags: TagEntity[];

  constructor(entity?: Partial<ProductEntity>) {
    this.id = entity?.id;
  }
}
