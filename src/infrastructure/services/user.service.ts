import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllDTO, RegisterUserDTO, UserModel } from 'src/data/contract/user.contract';
import { UserEntity } from 'src/data/entities/user.entity';
import { UserContract } from 'src/domain/contract/user.contract';
import { Repository } from 'typeorm';
import { encrypt } from '../utils';

@Injectable()
export default class UserService implements UserContract<UserModel,Object> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async Create(param: RegisterUserDTO): Promise<UserModel> {
    try {
      const user = await this.userRepository.findOne({where:{email:param.email}})
      if(user){
        return user
      }
      param.password= await encrypt(param.password)
      const userCreate = await this.userRepository.create(param)
      if(!userCreate){
        return null
      }
      return userCreate
      
    } catch (error) {
      return error
    }
  }
  async GetAll(param: GetAllDTO): Promise<UserModel[]> {
    try {
      const user = await this.userRepository.find({
        where: { role: param.role },
      });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      return error;
    }
  }
  async GetOne(param: UserModel,id:string): Promise<UserModel> {
    try {
      const user = await this.userRepository.findOne({
        where: { role: param.role, id: param.id },
      });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      return error;
    }
  }
  async UpdateOne(param: UserModel, id: string): Promise<UserModel> {
    try {
      const data = await this.userRepository.update(id, param);
      if (!data) {
        return null;
      }
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      return error;
    }
  }
  async DeleteOne(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (!user) throw new HttpException('INTERNAL_ERROR',HttpStatus.BAD_REQUEST)
      await this.userRepository.delete(id);
      return 'delete complete';
    } catch (error) {
      return error;
    }
  }
}
