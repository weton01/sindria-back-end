import { UserEntity } from '@/auth/entities/user';
import { OrderEntity } from '@/order/entities/order';
import { RegexTypes } from '@app/utils/messages';
import { Transform, TransformFnParams } from 'class-transformer';
import { Matches } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'credit_cards' })
export class CreditCardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Matches(RegexTypes.creditCard, {
    message: 'cartão de crédito inválido',
  })
  @Transform(({ value }: TransformFnParams) => value.trim())
  number: string;

  @Column()
  name: string;

  @Column()
  cvc: string;

  @Column()
  @Matches(RegexTypes.expirationDate, {
    message: 'data de expiração inválida',
  })
  expirationDate: string;

  @Column()
  type: string;

  @Column()
  niceType: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => OrderEntity, (order) => order.creditCard)
  orders: OrderEntity[];

  @ManyToOne(() => UserEntity, (user) => user.creditCards, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;

  constructor(entity?: Partial<CreditCardEntity>) {
    this.id = entity?.id;
  }
}
