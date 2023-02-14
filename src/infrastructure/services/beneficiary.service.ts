import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Beneficiary } from 'src/data/entities';
import { Repository } from 'typeorm';
import { RegisterBeneficiaryDTO } from 'src/data/contract/beneficiary.contract';
import { UpdateBeneficiaryDTO } from '../../data/contract/beneficiary.contract';

@Injectable()
export class BeneficiaryService {
  constructor(
    @InjectRepository(Beneficiary)
    private readonly beneficiaryRepository: Repository<Beneficiary>,
  ) {}
  async create(params: RegisterBeneficiaryDTO) {
    const isExist = await this.beneficiaryRepository.find({
      where: { email: params.email },
    });
    if (isExist.length < 0)
      throw new HttpException('BENEFICIARY_REGISTERED', HttpStatus.CONFLICT);
    const beneficiary = await this.beneficiaryRepository.save(params);
    if (!beneficiary)
      throw new HttpException('SOMETHING WENT WRONG', HttpStatus.BAD_REQUEST);
    const data = {
      ok: true,
      beneficiary,
    };
    return data;
  }
  async getAll() {
      const beneficiarys = await this.beneficiaryRepository.find();
      if (beneficiarys.length<0)
        throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
      const data = {
        ok: true,
        beneficiarys,
      };
      return data;
  }
  async getOne(id: string) {

      const beneficiary = await this.beneficiaryRepository.find({
        where: { id: id },
        relations: {
          bankId: true,
        },
      });
      if (beneficiary.length <= 0) 
      {throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    console.log(beneficiary)
      const data = {
        ok: true,
        beneficiary,
      };
      return data;
  }
  async updateOne(params: UpdateBeneficiaryDTO, id: string) {

      const isExist = await this.beneficiaryRepository.findOne({
        where: { id },
      });
      if (!isExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
      const beneficiary = await this.beneficiaryRepository.update(
        isExist.id,
        params,
      );
      if (!beneficiary)
        throw new HttpException('SOMETHING_WENT_WRONG', HttpStatus.BAD_REQUEST);
      const data = { ok: true, beneficiary };
      return data;
  
  }
  async deleteOne(id: string) {

      const deleted = await this.beneficiaryRepository.restore(id);
      if(deleted.affected===0) throw new HttpException('NOT_FOUND',HttpStatus.NOT_FOUND)
      const data ={
        ok:true,
        message:"Deleted complete"
      }
      return data
  }
}
