import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BalanceEntity } from 'src/data/entities';
import { BalanceService } from 'src/infrastructure/services/balance.service';

@Controller('balance')
export class BalanceController {
    constructor(private readonly balanceService:BalanceService){
        
    }
    @Get('')
    getAll(){
       return this.balanceService.GetAll()
    }
    @Delete('/:id')
    delete(@Param('id') id:number){
        return this.balanceService.DeleteOne(id)
    }
    @Put('/:id')
    update(@Param('id') id:number, @Body() param:BalanceEntity){
return this.balanceService.UpdateOne(param,id)
    }
    @Get('/:id')
    getOne(@Param('id') id:number){
        return this.balanceService.GetOne(id)
    }
    @Post('')
    create(@Body() params:BalanceEntity){
        return this.balanceService.Create(params)
    }
}
