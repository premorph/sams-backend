import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Beneficiary } from 'src/data/entities';
import { Repository } from 'typeorm';
import { RegisterBeneficiaryDTO } from 'src/data/contract/beneficiary.contract';
import { join } from 'path';
import { UpdateBeneficiaryDTO } from '../../data/contract/beneficiary.contract';

@Injectable()
export class BeneficiaryService {
  constructor(
    @InjectRepository(Beneficiary)
    private readonly beneficiaryRepository: Repository<Beneficiary>,
  ) {}
  async create(params: RegisterBeneficiaryDTO) {
    try {
      const isExist = await this.beneficiaryRepository.find({
        where: { email: params.email },
      });
      if (isExist)
        throw new HttpException('BENEFICIARY_REGISTERED', HttpStatus.CONFLICT);
      const beneficiary = await this.beneficiaryRepository.save(params);
      if (!beneficiary)
        throw new HttpException('SOMETHING WENT WRONG', HttpStatus.BAD_REQUEST);
      const data = {
        ok: true,
        beneficiary,
      };
      return data;
    } catch (error) {
      throw new HttpException(
        'INTERNAL_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAll() {
    try {
      const beneficiarys = await this.beneficiaryRepository.find();
      if (!beneficiarys)
        throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
      const data = {
        ok: true,
        beneficiarys,
      };
      return data;
    } catch (error) {
      throw new HttpException(
        'INTERNAL_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getOne(id: string) {
    try {
      const beneficiary = await this.beneficiaryRepository.find({
        where: { id: id },
        relations: {
          bankId: true,
        },
      });
      if (!beneficiary)
        throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
      const data = {
        ok: true,
        beneficiary,
      };
      return data;
    } catch (error) {
      throw new HttpException(
        'INTERNAL_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateOne(params: UpdateBeneficiaryDTO, id: string) {
    try {
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
    } catch (error) {
      throw new HttpException(
        'INTERNAL_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteOne(id: string) {
    try {
      const deleted = await this.beneficiaryRepository.softDelete(id);
      console.log('deleted->', deleted);
    } catch (error) {
      throw new HttpException(
        'INTERNAL_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
