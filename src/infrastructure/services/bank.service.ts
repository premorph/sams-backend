import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import {
  RegisterBankDTO,
  UpdateBankDTO,
} from 'src/data/contract/bank.contract';
import { Bank } from 'src/data/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>,
  ) {}
  async Create(params: RegisterBankDTO, req: Request) {
    const user_id = req.user['id'];
    const isExist = await this.bankRepository.find({
      where: { accountNumber: params.accountNumber },
    });
    if (isExist.length < 0)
      throw new HttpException('ACCOUNT_BANK_REGISTERED', HttpStatus.CONFLICT);
    const payload = {
      ...params,
      user_id,
    };
    const bank = await this.bankRepository.save(payload);
    if (!bank)
      throw new HttpException('SOMETHING_WENT_WRONG', HttpStatus.BAD_REQUEST);
    const data = { ok: true, bank };
    return data;
  }
  async GetAll() {
    const banks = await this.bankRepository.find();
    if (!banks) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    const data = { ok: true, banks };
    return data;
  }
  async GetOne(id: string) {
    const banks = await this.bankRepository.findOne({ where: { id: id } });
    if (!banks)
      throw new HttpException('ACCOUNT_BANK_REGISTERED', HttpStatus.CONFLICT);
    const data = { ok: true, banks };
    return data;
  }
  async updateOne(params: UpdateBankDTO, id: string) {
    const isExist = await this.bankRepository.find({ where: { id: id } });
    if (!isExist)
      throw new HttpException('BANK_NOT_EXIST', HttpStatus.NOT_FOUND);
    const bank = await this.bankRepository.update(id, params);
    if (!bank)
      throw new HttpException('SOMETHIG_WENT_WRONG', HttpStatus.BAD_REQUEST);
    const data = {
      ok: true,
      bank,
    };
    return data;
  }
  async deleteOne(id: string) {
    const deleted = await this.bankRepository.softDelete(id);
    console.log('deleted->', deleted);
  }
}
