import { Entity, Column } from 'typeorm';

@Entity({ name: 'rangeSchema' })
export class RangeSchema {
  @Column()
  begin: string;

  @Column()
  end: string;
}
