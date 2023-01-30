import {
  Controller,
  Post,
  UseGuards,
  Get,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { BeneficiaryService } from '../services/beneficiary.service';
import { JWTGuard } from '../guards/jwt.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Rol } from '../decorators/rol.decorator';
import {
  RegisterBeneficiaryDTO,
  UpdateBeneficiaryDTO,
} from 'src/data/contract/beneficiary.contract';
@ApiTags('Beneficiary')
@UseGuards(JWTGuard)
@ApiBearerAuth()
@Rol(['admin'])
@Controller('beneficiary')
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}
  @Get('/')
  GetAll() {
    return this.beneficiaryService.getAll();
  }
  @Get('/:id')
  GetOne(@Param() id: string) {
    return this.beneficiaryService.getOne(id);
  }
  @Post('/')
  Create(@Body() params: RegisterBeneficiaryDTO) {
    return this.beneficiaryService.create(params);
  }
  @Delete('/:id')
  DeleteOne(@Param() id: string) {
    return this.beneficiaryService.deleteOne(id);
  }
  @Put('/:id')
  UpdateOne(@Body() params: UpdateBeneficiaryDTO, @Param() id: string) {
    return this.beneficiaryService.updateOne(params, id);
  }
}
