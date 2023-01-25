import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GetAllDTO, RegisterUserDTO, UserModel } from 'src/data/contract/user.contract';
import { UserContract } from 'src/domain/contract/user.contract';
import { Rol } from '../decorators/rol.decorator';
import { JWTGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import UserService from '../services/user.service';

@UseGuards(JWTGuard,RolesGuard)
@Rol(['admin'])
@Controller('user')
export class UserController implements UserContract<UserModel,any>{
    constructor(private readonly userService:UserService){}
    GetAll(@Param()param: GetAllDTO): Promise<any[]> {
        return this.userService.GetAll(param)
    }
    @Get('/:id')
    GetOne(@Body() param: UserModel,@Param() id: string): Promise<any> {
        return this.userService.GetOne(param,id)
    }
    @Put('/:id')
    UpdateOne(@Body() param: UserModel, @Param() id: string): Promise<any> {
        return this.userService.UpdateOne(param,id)
    }
    @Delete('/:id')
    DeleteOne(@Param()id: string) {
        return this.userService.DeleteOne(id)
    }
    @Post('/')
    Create(@Body()param: RegisterUserDTO): Promise<any> {
        return this.userService.Create(param)
    }
}
