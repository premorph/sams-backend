import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  GetAllDTO,
  RegisterUserDTO,
  UserModel,
} from 'src/data/contract/user.contract';
import { UserContract } from 'src/domain/contract/user.contract';
import { Rol } from '../decorators/rol.decorator';
import { JWTGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import UserService from '../services/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@UseGuards(JWTGuard, RolesGuard)
@ApiBearerAuth()
@Rol(['admin'])
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
