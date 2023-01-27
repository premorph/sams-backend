import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bank } from './bank.entity';
@Entity()
export class Beneficiary {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  dni: string;
  @Column({ unique: true })
  email: string;
  @Column()
  isActive: boolean;
  @OneToMany(() => Bank, (bank) => bank.companyId)
  bankId: Bank[];
}
