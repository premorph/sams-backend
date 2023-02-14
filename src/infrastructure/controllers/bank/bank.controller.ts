import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterBankDTO } from 'src/data/contract/bank.contract';
import { JWTGuard } from 'src/infrastructure/guards/jwt.guard';
import { BankService } from 'src/infrastructure/services/bank.service';
import { UpdateBankDTO } from 'src/data/contract/bank.contract';
@ApiTags('Bank')
@UseGuards(JWTGuard)
@ApiBearerAuth()
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}
  @Get('/')
  GetAll() {
    return this.bankService.GetAll();
  }
  @Get('/:id')
  GetOne(@Param('id') id: string) {

    return this.bankService.GetOne(id);
  }
  @Post('/')
  Create(@Body() params: RegisterBankDTO, @Request() req) {
    return this.bankService.Create(params, req);
  }
  @Delete('/:id')
  Delete(@Param() id: string) {
    return this.bankService.deleteOne(id);
  }
  @Put('/:id')
  UpdateOne(@Param() id: string, @Body() params: UpdateBankDTO) {
    return this.bankService.updateOne(params, id);
  }
}
