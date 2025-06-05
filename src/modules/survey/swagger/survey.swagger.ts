import {
  applyDecorators,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import SurveyModel from '../models/survey.model';
import { SurveyDto } from '../dtos/survey.dto';
import { PaginationModel } from 'src/common/models/pagination.model';

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

export function GetSurveySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '설문 폼 단일 조회',
      description: '설문조사 폼을 ID로 조회합니다.',
    }),
    ApiParam({
      name: 'id',
      description: '설문 폼 ID',
      type: 'number',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: '조회 성공',
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
      status: 404,
      description: '해당 아이디로 설문조사를 찾을 수 없음',
      example: new NotFoundException('설문조사를 찾지 못했습니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}

export function GetListSurveySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '설문 폼 리스트 조회',
      description: '설문조사 폼 리스트 조회하기',
    }),
    ApiQuery({
      name: 'page',
      description: '페이지 번호 | 기본값 1',
      type: 'number',
      example: 1,
      required: false,
    }),
    ApiQuery({
      name: 'size',
      description: '페이지당 항목 수 | 기본값 10',
      type: 'number',
      example: 10,
      required: false,
    }),
    ApiQuery({
      name: 'sort',
      description: '정렬 대상 | 기본값 createdAt',
      required: false,
      type: 'string',
      example: 'createdAt',
    }),
    ApiQuery({
      name: 'order',
      description:
        '정렬 방향 | DESC(내림차순) 또는 ASC(오름차순) | 기본값 DESC',
      required: false,
      type: 'string',
      example: 'DESC',
    }),
    ApiQuery({
      name: 'keyword',
      description: '검색어 | 검색대상은 제목입니다.',
      required: false,
      type: 'string',
      example: '',
    }),

    ApiResponse({
      status: 200,
      description: '조회 성공',
      type: PaginationModel<SurveyModel>,
      example: {
        total: 48,
        page: 1,
        size: 10,
        list: [
          {
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
        ],
      },
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청',
      example: new BadRequestException('페이지 번호는 1 이상이어야 합니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}

export function DeleteSurveySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '설문조사 삭제',
      description: '설문조사를 삭제합니다. (soft delete)',
    }),
    ApiParam({
      name: 'id',
      description: '설문 폼 ID',
      type: 'number',
      example: 1,
    }),
    ApiResponse({
      status: 204,
      description: '삭제 성공',
    }),
    ApiResponse({
      status: 400,
      description: '필수파라미터 누락',
      example: new BadRequestException('설문 폼 ID가 필요합니다.'),
    }),
    ApiResponse({
      status: 403,
      description: '삭제 권한 없음',
      example: new NotFoundException('해당 설문조사를 삭제할 권한이 없습니다.'),
    }),
    ApiResponse({
      status: 404,
      description: '해당 아이디로 설문조사를 찾을 수 없음',
      example: new NotFoundException(
        '해당 설문조사는 이미 삭제되었거나 존재하지 않습니다.',
      ),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}
