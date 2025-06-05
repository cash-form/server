import { ApiProperty } from '@nestjs/swagger';
import UserModel from 'src/modules/user/models/user.model';
import SurveyGuideModel from './surveyGuide.model';
import SurveyQuestionModel from './surveyQuestion.model';
import { SurveyProductType } from 'src/types';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

export default class SurveyModel {
  @ApiProperty({
    description: '설문조사 폼 ID',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: '설문조사 폼 제목',
    example: '고객 만족도 조사',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: '설문조사 시작 시점',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  @Expose()
  startDate: Date;

  @ApiProperty({
    description: '설문조사 종료 시점',
    example: '2023-10-31T23:59:59.999Z',
    type: Date,
  })
  @Expose()
  endDate: Date;

  @ApiProperty({
    description:
      '결제된 상품 명 - 1:"BASIC", 2:"DELUXE", 3:"PREMIUM", 4:"PROFESSIONAL"',
    example: 1,
    enum: SurveyProductType,
  })
  @Expose()
  product: SurveyProductType;

  @ApiProperty({
    description: '참여보상',
    example: 200,
    type: Number,
  })
  @Expose()
  credit: number;

  @ApiProperty({
    description: '설문조사 폼 등록일',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: '설문조사 폼 수정일',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    description: '설문조사 작성자',
    example: new UserModel(),
    type: UserModel,
  })
  @Expose()
  @Transform(({ value }) => {
    const {
      email,
      password,
      refreshToken,
      isDeleted,
      marketingConsent,
      newsletterConsent,
      createdAt,
      updatedAt,
      status,
      ...model
    } = value;
    return model;
  })
  @Type(() => UserModel, {
    keepDiscriminatorProperty: true,
  })
  author: UserModel;

  @ApiProperty({
    description: '참여자 수',
    example: 41,
    type: Number,
  })
  @Expose()
  participantCount: number;

  @ApiProperty({
    description: '설문조사 헤더(상단) 정보',
    type: () => SurveyGuideModel,
    example: {
      text: '안녕하세요! 저희 서비스에 대한 만족도 조사입니다.',
      images: ['https://example.com/header-image.jpg'],
    },
  })
  @Type(() => SurveyGuideModel)
  @Expose()
  header: SurveyGuideModel;

  @ApiProperty({
    description: '설문조사 푸터(하단) 정보',
    type: () => SurveyGuideModel,
    example: {
      text: '설문에 참여해주셔서 감사합니다.',
      images: [],
    },
  })
  @Type(() => SurveyGuideModel)
  @Expose()
  footer: SurveyGuideModel;

  @ApiProperty({
    description: '설문조사 질문 목록',
    type: () => SurveyQuestionModel,
  })
  @Expose()
  questions: SurveyQuestionModel[];

  @Exclude()
  guides: SurveyGuideModel[];
}
