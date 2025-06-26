import {
  Controller,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationModel } from 'src/common/models/pagination.model';
import PaginationDto from 'src/common/dtos/pagination.dto';
import { CreditService } from '../services/credit.service';
import {
  GetCreditSwagger,
  GetListCreditSwagger,
} from '../swagger/credit.swagger';
import CreditModel from '../models/credit.model';

@ApiTags('크레딧')
@Controller('credits')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Get(':id')
  @GetCreditSwagger()
  async getDetail(@Param('id') id: string): Promise<CreditModel> {
    return await this.creditService.findById(+id);
  }

  @Get()
  @GetListCreditSwagger()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getList(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationModel<CreditModel>> {
    return await this.creditService.findList(paginationDto);
  }
}
