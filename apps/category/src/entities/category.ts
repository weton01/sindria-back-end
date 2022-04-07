import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
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
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    description: 'the url of image',
    example: 'https://any_image.com',
  })
  @Column()
  image: string;

  @TreeChildren()
  subCategories: CategoryEntity[];

  @TreeParent()
  parent: CategoryEntity;

  @ApiProperty()
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at?: Date;

  constructor(entity?: Partial<CategoryEntity>) {
    this.id = entity?.id;
  }
}
