import { ApiProperty } from '@nestjs/swagger';
import UserModel from 'src/modules/user/models/user.model';
import SurveyGuideModel from './surveyGuide.model';
import SurveyQuestionModel from './surveyQuestion.model';
import { SurveyProductType } from 'src/types';

export default class SurveyModel {
  @ApiProperty({
    description: '설문조사 폼 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '설문조사 폼 제목',
    example: '고객 만족도 조사',
  })
  title: string;

  @ApiProperty({
    description: '설문조사 시작 시점',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  startDate: Date;

  @ApiProperty({
    description: '설문조사 종료 시점',
    example: '2023-10-31T23:59:59.999Z',
    type: Date,
  })
  endDate: Date;

  @ApiProperty({
    description: '결제된 상품 명',
    example: 'BASIC',
    enum: ['BASIC', 'DELUXE', 'PREMIUM', 'PROFESSIONAL'],
  })
  product: SurveyProductType;

  @ApiProperty({
    description: '참여보상',
    example: 200,
    type: Number,
  })
  credit: number;

  @ApiProperty({
    description: '설문조사 폼 등록일',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: '설문조사 폼 수정일',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    description: '설문조사 작성자',
    example: new UserModel(),
    type: UserModel,
  })
  author: UserModel;

  @ApiProperty({
    description: '참여자 수',
    example: 41,
    type: Number,
  })
  participantCount: number;

  @ApiProperty({
    description: '설문조사 헤더(상단) 정보',
    type: () => SurveyGuideModel,
    example: {
      text: '안녕하세요! 저희 서비스에 대한 만족도 조사입니다.',
      images: ['https://example.com/header-image.jpg'],
    },
  })
  header: SurveyGuideModel;

  @ApiProperty({
    description: '설문조사 푸터(하단) 정보',
    type: () => SurveyGuideModel,
    example: {
      text: '설문에 참여해주셔서 감사합니다.',
      images: [],
    },
  })
  footer: SurveyGuideModel;

  @ApiProperty({
    description: '설문조사 질문 목록',
    type: () => SurveyQuestionModel,
  })
  questions: SurveyQuestionModel[];
}
