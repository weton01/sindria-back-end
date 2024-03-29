import { OrderProductEntity } from '@/order/entities/order-product';
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
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'categories' })
@Tree('closure-table')
export class CategoryEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'the name of category',
    example: 'any_category',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'the url of images',
    example: 'name_of_icon',
  })
  @Column('simple-array')
  images: string[];

  @TreeChildren()
  subCategories: CategoryEntity[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent: CategoryEntity;

  @Column({ nullable: true })
  groupName: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products: ProductEntity[];

  @ManyToMany(
    () => OrderProductEntity,
    (orderProduct) => orderProduct.categories,
  )
  orderProducts: OrderProductEntity[];

  constructor(entity?: Partial<CategoryEntity>) {
    this.id = entity?.id;
  }
}
