import { UserEntity } from '@/auth/entities/user';
import { CouponTypes } from '@app/common/enums/coupon-type';
import { floatTransformer } from '@app/common/transformers/float';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'coupons' })
export class CouponEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  discount: number;

  @Column({
    type: 'enum',
    enum: CouponTypes,
    default: CouponTypes.percentage,
  })
  type: CouponTypes;

  @Column({
    type: 'date',
  })
  expiresAt: Date;

  @Column({
    default: false,
  })
  used: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => UserEntity, (user) => user.coupons)
  user: UserEntity;

  constructor(entity?: Partial<CouponEntity>) {
    this.id = entity?.id;
  }
}
