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
import { RegisterUserDTO } from 'src/data/contract/user.contract';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/infrastructure/guards/roles.guard';
import { JWTGuard } from 'src/infrastructure/guards/jwt.guard';
import UserService from 'src/infrastructure/services/user.service';
import { Rol } from 'src/infrastructure/decorators/rol.decorator';
import { UpdateUserDTO } from '../../../data/contract/user.contract';
@ApiTags('Users')
@UseGuards(JWTGuard, RolesGuard)
@ApiBearerAuth()
@Rol(['admin'])
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  GetAll() {
    return this.userService.GetAll();
  }
  @Get('/:id')
  GetOne(@Param() id: string) {
    return this.userService.GetOne(id);
  }
  @Post('/')
  Create(@Body() params: RegisterUserDTO) {
    return this.userService.create(params);
  }
  @Delete('/:id')
  DeleteOne(@Param() id: string) {
    return this.userService.DeleteOne(id);
  }
  @Put('/:id')
  UpdateOne(@Body() params: UpdateUserDTO, @Param() id: string) {
    return this.userService.UpdateOne(params, id);
  }
}
