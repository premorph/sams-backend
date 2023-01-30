import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bank } from './bank.entity';
@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  dni: string;
  @OneToMany(() => Bank, (bank) => bank.id)
  bank_id: Bank[];
}
