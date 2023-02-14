import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
  @Column({ default: true })
  isActive: boolean;
  @Column({default:1})
  type: boolean; 
  @OneToMany(() => Bank, (bank) => bank.company_id)
  bankId: Bank[];
  @CreateDateColumn()
  created!: Date;
  @UpdateDateColumn()
  updated!: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
