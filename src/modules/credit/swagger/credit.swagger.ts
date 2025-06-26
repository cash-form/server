import {
  applyDecorators,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import CreditModel from '../models/credit.model';
import { PaginationModel } from 'src/common/models/pagination.model';

export function GetCreditSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '크레딧 단일 조회',
      description: '크레딧을 ID로 조회합니다.',
    }),
    ApiParam({
      name: 'id',
      description: '크레딧 ID',
      type: 'number',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: '조회 성공',
      type: CreditModel,
    }),
    ApiResponse({
      status: 404,
      description: '해당 아이디로 크레딧을 찾을 수 없음',
      example: new NotFoundException('크레딧을 찾지 못했습니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}

export function GetListCreditSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '크레딧 리스트 조회',
      description: '크레딧 리스트 조회하기',
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
      type: PaginationModel<CreditModel>,
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
