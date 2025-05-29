import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class SurveyQuestionModel {
  @ApiProperty({
    description: '질문 유형',
    example: 'multiple',
    enum: ['multiple', 'subjective', 'descriptive', 'ox', 'point'],
  })
  @IsEnum(['multiple', 'subjective', 'descriptive', 'ox', 'point'])
  @IsNotEmpty()
  type: 'multiple' | 'subjective' | 'descriptive' | 'ox' | 'point' = 'multiple';

  @ApiProperty({
    description: '질문 제목',
    example: '저희 서비스에 얼마나 만족하십니까?',
  })
  @IsString()
  @IsNotEmpty()
  title: string = '';

  @ApiProperty({
    description: '질문 상세 설명',
    example: '아래 옵션 중 하나를 선택해주세요.',
    required: false,
  })
  @IsString()
  @IsOptional()
  text: string = '';

  @ApiProperty({
    description: '질문 관련 이미지 URL 목록',
    example: [],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  images: string[] = [];

  @ApiProperty({
    description: '선택 옵션 목록 (객관식 질문용)',
    example: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  options: string[] = [];

  @ApiProperty({
    description: '다중 선택 가능 개수 (객관식 질문용)',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  multipleCount: number = 0;

  @ApiProperty({
    description: '주관식 답변 최대 길이 (주관식 질문용)',
    example: 500,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  maxLength: number = 0;
}
