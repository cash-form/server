import { plainToInstance } from 'class-transformer';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { SurveyGuide } from '../entities/surveyGuide.entity';
import { SurveyQuestion } from '../entities/surveyQuestion.entity';
import { SurveyDto } from '../dtos/survey.dto';
import { User } from 'src/modules/user/entities/user.entity';
import SurveyModel from '../models/survey.model';
import { PaginationModel } from 'src/common/models/pagination.model';
import PaginationDto from 'src/common/dtos/pagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';
import { SurveyGuideType } from 'src/types';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(SurveyGuide)
    private readonly guideRepository: Repository<SurveyGuide>,
    @InjectRepository(SurveyQuestion)
    private readonly questionRepository: Repository<SurveyQuestion>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly paginationService: PaginationService,
  ) {}

  async createSurvey(id: number, surveyDto: SurveyDto): Promise<SurveyModel> {
    const author = await this.userRepository.findOne({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException('작성자를 찾을 수 없습니다.');
    }

    const survey = this.surveyRepository.create({
      title: surveyDto.title,
      startDate: new Date(surveyDto.startDate),
      endDate: new Date(surveyDto.endDate),
      product: surveyDto.product,
      authorId: id,
    });
    const savedSurvey = await this.surveyRepository.save(survey);

    const newHeader = this.guideRepository.create({
      ...surveyDto.header,
      type: SurveyGuideType.HEADER,
      survey: savedSurvey,
    });

    const newFooter = this.guideRepository.create({
      ...surveyDto.footer,
      type: SurveyGuideType.FOOTER,
      survey: savedSurvey,
    });

    await this.guideRepository.save(newHeader);
    await this.guideRepository.save(newFooter);

    for (let i = 0; i < surveyDto.questions.length; i++) {
      const questionDto = surveyDto.questions[i];
      const question = this.questionRepository.create({
        ...questionDto,
        orderIndex: i,
        survey: savedSurvey,
      });

      await this.questionRepository.save(question);
    }

    return await this.findCompleteSurvey(savedSurvey.id);
  }

  async getSurveyDetail(id: number): Promise<SurveyModel> {
    return await this.findCompleteSurvey(id);
  }
  async getSurveyList(
    paginationDto: PaginationDto,
  ): Promise<PaginationModel<SurveyModel>> {
    const searchFields = ['title'];
    const relations = ['author'];

    const result = await this.paginationService.paginate<Survey>(
      this.surveyRepository,
      paginationDto,
      relations,
      searchFields,
    );

    // Survey 엔티티를 SurveyModel로 변환
    const transformedList = result.list.map((survey) =>
      plainToInstance(SurveyModel, survey, {
        excludeExtraneousValues: false,
        exposeUnsetFields: false,
      }),
    );

    return {
      ...result,
      list: transformedList,
    };
  }

  async deleteSurvey(userId: number, id: number): Promise<void> {
    const survey = await this.surveyRepository.findOne({ where: { id } });

    if (!survey) {
      throw new NotFoundException(
        '해당 설문조사가 이미 삭제되었거나 존재하지 않습니다.',
      );
    }

    if (+survey.authorId !== userId) {
      throw new ForbiddenException('해당 설문조사를 삭제할 권한이 없습니다.');
    }

    const deleteSurvey = { ...survey, isDeleted: true };

    await this.surveyRepository.save(deleteSurvey);

    return;
  }

  async findCompleteSurvey(id: number): Promise<SurveyModel> {
    const completeSurvey = await this.surveyRepository.findOne({
      where: { id },
      relations: ['guides', 'questions', 'author'],
    });

    if (!completeSurvey) {
      throw new NotFoundException('생성된 설문조사를 찾을 수 없습니다.');
    }

    const headerGuide = completeSurvey.guides?.find(
      (guide) => guide.type === SurveyGuideType.HEADER,
    );

    const footerGuide = completeSurvey.guides?.find(
      (guide) => guide.type === SurveyGuideType.FOOTER,
    );

    return plainToInstance(
      SurveyModel,
      {
        ...completeSurvey,
        headers: headerGuide,
        footers: footerGuide,
      },
      {
        excludeExtraneousValues: false,
      },
    );
  }
}
