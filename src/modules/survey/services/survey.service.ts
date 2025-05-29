import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { SurveyGuide } from '../entities/surveyGuide.entity';
import { SurveyQuestion } from '../entities/surveyQuestion.entity';
import { SurveyDto } from '../dtos/survey.dto';
import { User } from 'src/modules/user/entities/user.entity';
import SurveyModel from '../models/survey.model';
import SurveyQuestionModel from '../models/surveyQuestion.model';

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
  ) {}

  async createSurvey(id: number, surveyDto: SurveyDto): Promise<SurveyModel> {
    console.log('Creating survey with data:', surveyDto);

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

    if (surveyDto.header) {
      const headerGuide = this.guideRepository.create({
        type: 'HEADER',
        text: surveyDto.header.text,
        images: surveyDto.header.images,
        survey: savedSurvey,
      });
      await this.guideRepository.save(headerGuide);
    }

    if (surveyDto.footer) {
      const footerGuide = this.guideRepository.create({
        type: 'FOOTER',
        text: surveyDto.footer.text,
        images: surveyDto.footer.images,
        survey: savedSurvey,
      });
      await this.guideRepository.save(footerGuide);
    }

    if (surveyDto.questions && surveyDto.questions.length > 0) {
      for (let i = 0; i < surveyDto.questions.length; i++) {
        const questionDto = surveyDto.questions[i];
        const question = this.questionRepository.create({
          type: questionDto.type,
          title: questionDto.title,
          text: questionDto.text,
          images: questionDto.images,
          options: questionDto.options, // 옵션을 바로 question에 저장
          multipleCount: questionDto.multipleCount,
          maxLength: questionDto.maxLength,
          orderIndex: i,
          survey: savedSurvey,
        });

        await this.questionRepository.save(question);
      }
    }

    const completeSurvey = await this.surveyRepository.findOne({
      where: { id: savedSurvey.id },
      relations: ['guides', 'questions', 'author'],
    });

    if (!completeSurvey) {
      throw new NotFoundException('생성된 설문조사를 찾을 수 없습니다.');
    }

    // Survey 엔티티를 SurveyModel로 변환하기 전에 header와 footer 정보 추출
    const surveyModel = new SurveyModel();
    surveyModel.id = completeSurvey.id;
    surveyModel.title = completeSurvey.title;
    surveyModel.startDate = completeSurvey.startDate;
    surveyModel.endDate = completeSurvey.endDate;
    surveyModel.product = completeSurvey.product;
    surveyModel.createdAt = completeSurvey.createdAt;
    surveyModel.updatedAt = completeSurvey.updatedAt;
    surveyModel.author = completeSurvey.author;
    surveyModel.participantCount = completeSurvey.participantCount || 0;

    // 질문 변환
    surveyModel.questions = completeSurvey.questions.map((q) => {
      const questionModel = new SurveyQuestionModel();
      questionModel.type = q.type;
      questionModel.title = q.title;
      questionModel.text = q.text || '';
      questionModel.images = q.images || [];
      questionModel.options = q.options || [];
      questionModel.multipleCount = q.multipleCount || 0;
      questionModel.maxLength = q.maxLength || 0;
      return questionModel;
    });

    // header와 footer 처리
    const headerGuide = completeSurvey.guides?.find(
      (guide) => guide.type === 'HEADER',
    );
    if (headerGuide) {
      surveyModel.header = {
        text: headerGuide.text || '',
        images: headerGuide.images || [],
      };
    }

    const footerGuide = completeSurvey.guides?.find(
      (guide) => guide.type === 'FOOTER',
    );
    if (footerGuide) {
      surveyModel.footer = {
        text: footerGuide.text || '',
        images: footerGuide.images || [],
      };
    }

    return surveyModel;
  }

}
