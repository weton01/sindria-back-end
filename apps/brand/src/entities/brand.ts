import { OrderProductEntity } from '@/order/entities/order-product';
import { ProductEntity } from '@/product/entities/product';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'brands' })
export class BrandEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  name: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
  
  @OneToMany(() => ProductEntity, (product) => product.brand, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  products: ProductEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.brand)
  orderProducts: OrderProductEntity;

  constructor(entity?: Partial<BrandEntity>) {
    this.id = entity?.id;
  }
}
