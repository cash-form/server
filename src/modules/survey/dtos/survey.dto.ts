import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import SurveyGuideDto from './surveyGuide.dto';
import SurveyQuestionDto from './surveyQuestion.dto';
import { SurveyProductType } from 'src/types';

export class SurveyDto {
  @ApiProperty({
    description:
      '상품 종류 - 1:"BASIC", 2:"DELUXE", 3:"PREMIUM", 4:"PROFESSIONAL"',
    example: 1,
    enum: SurveyProductType,
  })
  @IsEnum(SurveyProductType)
  @IsNotEmpty()
  @Expose({ name: 'product' })
  public readonly product: SurveyProductType;

  @ApiProperty({
    description: '설문조사 제목',
    example: '고객 만족도 설문조사',
  })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'title' })
  public readonly title: string = '';

  @ApiProperty({
    description: '설문조사 시작일',
    example: '2025-05-29T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose({ name: 'startDate' })
  public readonly startDate: string = '';

  @ApiProperty({
    description: '설문조사 종료일',
    example: '2025-06-30T23:59:59.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose({ name: 'endDate' })
  public readonly endDate: string = '';

  @ApiProperty({
    description: '설문조사 헤더(상단) 정보',
    type: () => SurveyGuideDto,
  })
  @ValidateNested()
  @Type(() => SurveyGuideDto)
  @Expose({ name: 'header' })
  public readonly header: SurveyGuideDto = new SurveyGuideDto();

  @ApiProperty({
    description: '설문조사 질문 목록',
    type: () => [SurveyQuestionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SurveyQuestionDto)
  @Expose({ name: 'questions' })
  public readonly questions: SurveyQuestionDto[] = [];

  @ApiProperty({
    description: '설문조사 푸터(하단) 정보',
    type: () => SurveyGuideDto,
  })
  @ValidateNested()
  @Type(() => SurveyGuideDto)
  @Expose({ name: 'footer' })
  public readonly footer: SurveyGuideDto = new SurveyGuideDto();
}
