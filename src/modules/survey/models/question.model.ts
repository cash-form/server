import { ApiProperty } from '@nestjs/swagger';
import { SurveyQuestionType } from 'src/types';

export default class QuestionModel {
  @ApiProperty({
    description: '고유 아이디',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: '폼 형식 타입 - multiple, subjective, descriptive, ox, point',
    example: SurveyQuestionType[1],
    enum: SurveyQuestionType,
  })
  type: SurveyQuestionType;

  @ApiProperty({
    description: '폼 제목',
    example: '항목 제목입니다. 최대 20자까지 입력 가능합니다.',
    type: String,
    maxLength: 20,
    minLength: 1,
    required: true,
  })
  title: string;

  @ApiProperty({
    description: '폼 질문',
    example: '항목 질문 내용입니다. 최대 1000자까지 입력 가능합니다.',
    type: String,
    maxLength: 1000,
    minLength: 1,
    required: true,
  })
  text: string;

  @ApiProperty({
    description: '이미지 URL 목록',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    type: [String],
    maxLength: 2,
    required: false,
  })
  images: string[];

  @ApiProperty({
    description: '옵션 목록 - 객관식, 포인트 타입에서 사용',
    example: ['옵션1', '옵션2', '옵션3'],
    type: [String],
    maxLength: 6,
    minLength: 2,
    required: false,
  })
  options: string[];

  @ApiProperty({
    description: '복수 선택 갯수 - 객관식 타입에서 사용',
    example: 2,
    type: Number,
    minimum: 1,
    maximum: 6,
  })
  multipleCount: number;

  @ApiProperty({
    description: '답변 최대 길이 - 주관식, 서술형 타입에서 사용',
    example: 30,
    type: Number,
    minimum: 0,
    maximum: 1000,
  })
  maxLength: number;
}
