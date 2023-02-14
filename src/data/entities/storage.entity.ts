import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class Storage{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    filename:string;
    @Column()
    type:string;
    @ManyToOne(()=>UserEntity,(user)=>user.id)
    user_id:UserEntity
    @Column()
    mimetype:string
    @Column({nullable:true})
    ref:number
}