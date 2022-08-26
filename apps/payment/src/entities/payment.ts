import { OrderEntity } from '@/order/entities/order';
import { floatTransformer } from '@app/common';
import {
  AsaasBillingType,
  AsaasChargeStatus,
} from '@app/utils/asaas/enums/charge';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payments' })
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: AsaasBillingType,
    nullable: false,
  })
  billingType: AsaasBillingType;

  @Column({
    type: 'enum',
    enum: AsaasChargeStatus,
    nullable: false,
  })
  status: AsaasChargeStatus;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  value: number;

  @Column()
  extenalId: string;

  @Column()
  dueDate: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToOne(() => OrderEntity, (order) => order.bills, {
    onDelete: 'CASCADE',
  })
  order: OrderEntity;

  constructor(entity?: Partial<PaymentEntity>) {
    this.id = entity?.id;
  }
}
