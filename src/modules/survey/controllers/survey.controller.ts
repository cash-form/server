import {
  Controller,
  UseGuards,
  Req,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { SurveyService } from '../services/survey.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types';
import {
  DeleteSurveySwagger,
  GetListSurveySwagger,
  GetSurveySwagger,
  InsertSurveySwagger,
} from '../swagger/survey.swagger';
import SurveyModel from '../models/survey.model';
import { SurveyDto } from '../dtos/survey.dto';
import { PaginationModel } from 'src/common/models/pagination.model';
import PaginationDto from 'src/common/dtos/pagination.dto';

@ApiTags('설문조사')
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @InsertSurveySwagger()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() surveyDto: SurveyDto,
  ): Promise<SurveyModel> {
    const id = req.user.sub;
    return await this.surveyService.createSurvey(id, surveyDto);
  }

  @Get(':id')
  @GetSurveySwagger()
  async getDetail(@Param('id') id: string): Promise<SurveyModel> {
    return await this.surveyService.getSurveyDetail(+id);
  }

  @Get()
  @GetListSurveySwagger()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getList(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationModel<SurveyModel>> {
    return await this.surveyService.getSurveyList(paginationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @DeleteSurveySwagger()
  async deleteSurvey(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<void> {
    const userId = req.user.sub;
    return await this.surveyService.deleteSurvey(userId, +id);
  }
}
