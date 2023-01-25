import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  fullname: string;
  @Column({unique:true})
  email: string;
  @Column()
  phoneNum: string;
  @Column()
  password: string;
  @Column({ default: 'empty.jpg' })
  profilePicture: string;
  @Column({ default: 'inactivo' })
  activationStatus: 'activo' | 'inactivo' | 'bloqueado';
  @Column()
  role: 'master' | 'import' | 'bought' | 'store';
}
