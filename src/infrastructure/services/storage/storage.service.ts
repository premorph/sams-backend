import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from 'src/data/entities/storage.entity';
import { StoreDTO, UpdateStoreDTO, RegisterStoreDTO } from 'src/domain/model/storage.model';
import { Repository } from 'typeorm';

@Injectable()
export class StorageService{
    constructor(@InjectRepository(Storage) private readonly storeRepository:Repository<Storage>) {
        
    }
    async GetAll(params:{ref:number;type:string}): Promise<StoreDTO[]> {
        const {ref,type}= params
        const storages = await this.storeRepository.find({where:{type,ref}})
        if(storages.length<0) throw new HttpException("NOT_FOUND",HttpStatus.NOT_FOUND)
        return storages
    }
    async UpdateOne(param: UpdateStoreDTO[], id: number) {
        let storage
        for(let p of param){
            delete p.id
            storage = await this.storeRepository.update({id:p.ref},{ref:id})
        }
        return storage    
        
    }
    DeleteOne(id: string) {
        throw new Error('Method not implemented.');
    }
   async Create(file:Array<Express.Multer.File>,param: RegisterStoreDTO):Promise<StoreDTO>{
    for(let f of file){
        const {filename,mimetype} = f
        const {type,user_id} = param
        console.log(file)
        const payload={filename,mimetype,type,user_id}
        const storage = await this.storeRepository.save(payload)
        if(!storage) throw new HttpException("SOMETHING_WENT_WRONG",HttpStatus.BAD_REQUEST)
        return storage
    }
        
    }
}
