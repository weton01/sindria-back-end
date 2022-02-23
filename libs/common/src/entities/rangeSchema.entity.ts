import { Entity, Column } from 'typeorm';

@Entity({ name: 'rangeSchema' })
export class RangeSchema {
  @Column({ type: 'timestamptz' })
  begin: Date;

  @Column({ type: 'timestamptz' })
  end: Date;
}
