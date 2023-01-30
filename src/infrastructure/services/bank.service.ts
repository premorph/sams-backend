import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterBankDTO, UpdateBankDTO } from 'src/data/contract/bank.contract';
import { Bank } from 'src/data/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>,
  ) {}
  async Create(params: RegisterBankDTO) {
    try {
      const isExist = await this.bankRepository.find({
        where: { accountNumber: params.accountNumber },
      });
      if (isExist)
        throw new HttpException('ACCOUNT_BANK_REGISTERED', HttpStatus.CONFLICT);

      const bank = await this.bankRepository.save(isExist);
      if (!bank)
        throw new HttpException('SOMETHING_WENT_WRONG', HttpStatus.BAD_REQUEST);
      const data = { ok: true, bank };
      return data;
    } catch (error) {
      throw new HttpException(
        'INTERNAL_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async GetAll() {
    try {
        const banks = await this.bankRepository.find();
        if (!banks)
          throw new HttpException('ACCOUNT_BANK_REGISTERED', HttpStatus.CONFLICT);
        const data = { ok: true, banks };
        return data; 
    } catch (error) {
        throw new HttpException('INTERNAL_ERROR', HttpStatus.INTERNAL_SERVER_ERROR) 
    }
  }
  async GetOne(id:string) {
    try {
        const banks = await this.bankRepository.findOne({where:{id:id}});
        if (!banks)
          throw new HttpException('ACCOUNT_BANK_REGISTERED', HttpStatus.CONFLICT); 
        const data = { ok: true, banks };
          return data
    } catch (error) {
        throw new HttpException('INTERNAL_ERROR', HttpStatus.INTERNAL_SERVER_ERROR) 
    }
  }
  async updateOne(params:UpdateBankDTO, id:string){
    const isExist = await this.bankRepository.find({where:{id:id}})
    if(!isExist) throw new HttpException('BANK_NOT_EXIST',HttpStatus.NOT_FOUND)
    const bank = await this.bankRepository.update(id,params) 
    if (!bank) throw new HttpException('SOMETHIG_WENT_WRONG',HttpStatus.BAD_REQUEST)
    const data ={
        ok:true,
        bank
    }
    return data
  }
}
