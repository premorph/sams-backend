import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/entities/user.entity';
import { FindOperator, Repository } from 'typeorm';
import { UpdateUserDTO, RegisterUserDTO } from 'src/data/contract/';
import { encrypt } from '../utils';
@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(params: RegisterUserDTO) {
      const userExist = await this.userRepository.findOne({
        where: { email: params.email },
      });
      if (userExist)
        throw new HttpException(
          'USER_REGISTER_PREVIOUSLY',
          HttpStatus.CONFLICT,
        );
      const passwordHash = await encrypt(params.password);
      params.password = passwordHash;
      const userData = await this.userRepository.save(params);
      console.log(userData);
      if (!userData)
        throw new HttpException('SOMETHING_WENT_WRONG', HttpStatus.BAD_REQUEST);
      return userData;

  }
  async GetAll() {

      const users = await this.userRepository.find({
        select: {
          email: true,
          fullname: true,
          phoneNum: true,
          role: true,
          isActive: true,
          id: true,
        },
      });
      if (!users)
        throw new HttpException('USERS_NOT_FOUND', HttpStatus.CONFLICT);
      return users;
    
  }
  async GetOne(id: number) {
      const users = await this.userRepository.find({
        select: {
          email: true,
          fullname: true,
          phoneNum: true,
          role: true,
          isActive: true,
          id: true,
        },
        where: {
          id: id,
        },
      });
      if (!users)
        throw new HttpException('USERS_NOT_FOUND', HttpStatus.CONFLICT);
      return users;
  }
  async DeleteOne(id: string) {
    await this.userRepository.update(id,{isActive:'inactivo'})
    const userDelete = await this.userRepository
      .createQueryBuilder('users')
      .softDelete()
      .where('id=:id', { id: id })
      .execute();
      if(userDelete.affected<1){
        throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
      }
      const data ={
        ok:true,
        message:'Usuario inactivado'
      }
      return data
  }
  async UpdateOne(param: UpdateUserDTO,  id: number) {
    const isExist = await this.userRepository.findOne({
      where: {
        id: param.id,
      },
    });
    delete param.id
    if (!isExist) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    const user = await this.userRepository.update(isExist.id, param);
    if (!user) throw new HttpException('USERS_NOT_FOUND', HttpStatus.CONFLICT);
    return user;
  }
}
