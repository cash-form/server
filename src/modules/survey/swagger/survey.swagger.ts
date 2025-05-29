import {
  applyDecorators,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import SurveyModel from '../models/survey.model';
import { SurveyDto } from '../dtos/survey.dto';

export function InsertSurveySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '설문 폼 등록',
      description: '설문조사 폼을 등록합니다.',
    }),
    ApiBody({
      description: '설문조사 폼 데이터',
      type: SurveyDto,
    }),
    ApiResponse({
      status: 201,
      description: '폼 등록 성공 - 저장된 폼 반환',
      type: SurveyModel,
      content: {
        'application/json': {
          example: {
            id: 1,
            title: '고객 만족도 조사',
            startDate: '2025-05-29T00:00:00.000Z',
            endDate: '2025-06-30T23:59:59.999Z',
            createdAt: '2025-05-29T00:00:00.000Z',
            updatedAt: '2025-05-29T00:00:00.000Z',
            credit: 200,
            author: {
              id: 1,
              name: '김형석',
              email: 'user@example.com',
            },
            participantCount: 0,
            header: {
              text: '안녕하세요! 저희 서비스에 대한 만족도 조사입니다.',
              images: ['https://example.com/header-image.jpg'],
            },
            footer: {
              text: '설문에 참여해주셔서 감사합니다.',
              images: [],
            },
            questions: [
              {
                type: 'multiple',
                title: '저희 서비스에 얼마나 만족하십니까?',
                text: '아래 옵션 중 하나를 선택해주세요.',
                options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'],
                multipleCount: 1,
                images: [],
              },
              {
                type: 'subjective',
                title: '서비스 개선을 위한 제안사항이 있으신가요?',
                text: '자유롭게 의견을 남겨주세요.',
                maxLength: 500,
                options: [],
                images: [],
              },
            ],
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '파라미터 잘못됨',
      example: new BadRequestException('타이틀은 필수입니다.'),
    }),
    ApiResponse({
      status: 401,
      description: '결제 필요',
      example: new UnauthorizedException('결제 후 생성 가능합니다.'),
    }),
    ApiResponse({
      status: 404,
      description: '사용자 정보 없음',
      example: new NotFoundException('잘못된 사용자 정보입니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}
