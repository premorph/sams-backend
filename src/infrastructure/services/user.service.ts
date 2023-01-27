import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO, RegisterUserDTO } from 'src/data/contract/';
import { encrypt } from '../utils';
@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(params: RegisterUserDTO) {
    try {
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
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async GetAll() {
    try {
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
    } catch (error) {
      throw new HttpException(
        'INTERNAL_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async GetOne(id: string) {
    try {
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
    } catch (error) {
      throw new HttpException(
        'INTERNAL_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async DeleteOne(id: string) {
    const userDelete = this.userRepository
      .createQueryBuilder('users')
      .softDelete()
      .where('id=:id', { id: id })
      .execute();
    console.log(userDelete);
  }
  async UpdateOne(param: UpdateUserDTO, id: string) {
    const isExist = await this.userRepository.find({
      where: {
        id: id,
      },
    });
    if (!isExist)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    const user = await this.userRepository.update(id, param);
    if (!user) throw new HttpException('USERS_NOT_FOUND', HttpStatus.CONFLICT);
    return user;
  }
}
