import {
  Controller,
  UseGuards,
  Req,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { SurveyService } from '../services/survey.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types';
import { InsertSurveySwagger } from '../swagger/survey.swagger';
import SurveyModel from '../models/survey.model';
import { SurveyDto } from '../dtos/survey.dto';

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
}
