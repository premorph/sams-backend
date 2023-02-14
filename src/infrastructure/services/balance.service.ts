import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BalanceContract } from 'src/data/contract';
import { BalanceEntity } from 'src/data/entities';
import { GenericContract } from 'src/domain/contract/Generic.contract';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceService {
    constructor(@InjectRepository(BalanceEntity) private readonly balanceRepository:Repository<BalanceEntity>){}
   async GetAll(): Promise<BalanceContract[]> {
        const balance = await this.balanceRepository.find({})
        console.log(balance)
        return balance
    }
    async GetOne( id: number): Promise<BalanceContract> {
        const balance = await this.balanceRepository.findOne({where:{id}})
        return balance
    }
   async UpdateOne(param: BalanceContract, id: number) {
    delete param.id
        const balance= await this.balanceRepository.update(id,param)
        const data ={
            ok:true,
            balance
        }
        return data
    }
    DeleteOne(id: number) {
        const deleted= this.balanceRepository.softDelete(id)
        return {
            message:'Registro eliminado'
        } 
    }
   async Create(param: BalanceContract): Promise<BalanceContract> {
        const balance = await this.balanceRepository.save(param)
        console.log(balance)
        return balance
    }
}
