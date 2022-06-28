import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { JunoCompanyType } from '@app/utils/adapters/juno/enums/juno-company-type';
import { JunoPaymentType } from '@app/utils/adapters/juno/enums/juno-payment-type';
import { JunoCompanyMembers } from '@app/utils/adapters/juno/interfaces/company-mebers';
import { JunoLegalRepresentative } from '@app/utils/adapters/juno/interfaces/legal-representative';
import { floatTransformer } from '@app/utils/transformes/entities/float';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'stores' })
export class StoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: JunoPaymentType,
    default: JunoPaymentType.PAYMENT
  })
  type: JunoPaymentType

  @Column({ unique: true })
  name: string;

  @Column('simple-array')
  images: string[];

  @Column()
  document: string;

  @Column()
  phone: string;

  @Column()
  businessArea: number;

  @Column()
  linesOfBusiness: string;

  @Column()
  cnae: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  monthlyIncomeOrRevenue: number;

  @Column({
    type: 'enum',
    enum: JunoCompanyType
  })
  companyType: string;

  @Column('simple-json')
  legalRepresentative: JunoLegalRepresentative;

  @Column('simple-json')
  companyMembers: JunoCompanyMembers[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToOne(() => UserEntity, (user) => user.store)
  user: UserEntity;

  @OneToOne(() => AddressEntity, (address) => address.store, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  address: AddressEntity;

  constructor(entity?: Partial<StoreEntity>) {
    this.id = entity?.id;
  }
}
