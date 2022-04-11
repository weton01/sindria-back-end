import { UserEntity } from '@/auth/entities/user';
import { CategoryEntity } from '@/category/entities/category';
import { BrandEntity } from 'apps/brand/src/entities/brand';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
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

  @Column({ default: true })
  active: boolean;

  @Column()
  grossAmount: number;

  @Column()
  netAmount: number;

  @Column("simple-array")
  images: string[];

  @ManyToOne(() => UserEntity, (user) => user.products)
  user: UserEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  brand: BrandEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  categories: CategoryEntity[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor(entity?: Partial<ProductEntity>) {
    this.id = entity?.id;
  }
}
