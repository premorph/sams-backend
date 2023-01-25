import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class BalanceEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date?: string;
  @Column()
  amount?: number;
  @Column()
  rate?: number;
  @Column()
  bs?: number;
  @Column()
  boughtFrom?: string;
  @Column()
  datePay?: string;
  @Column()
  bankFrom?: string;
  @Column()
  company?: string;
  @Column()
  accountNumberFrom?: string;
  @Column()
  ref?: string;
  @Column()
  note?: string;
  @Column()
  beneficiary?: string;
  @Column()
  bankTo?: string;
  @Column()
  accountNumberTo?: string;
  @Column()
  DNI?: string;
  @Column()
  obsvervation?: string;
  @Column({ default: 'Pendiente' })
  status: 'Pendiente' | 'Entregado';
}
