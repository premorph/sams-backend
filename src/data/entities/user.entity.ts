import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  fullname: string;
  @Column({ unique: true })
  email: string;
  @Column()
  phoneNum: string;
  @Column()
  password: string;
  @Column({ default: 'empty.jpg' })
  profilePicture: string;
  @Column({ default: 'inactivo' })
  isActive: string;
  @Column({default:'user'})
  role: string;
  @CreateDateColumn()
  created!: Date;
  @UpdateDateColumn()
  updated!: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
