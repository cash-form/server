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
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import ImageModel from '../models/image.model';

export function UploadImageSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '이미지 업로드',
      description: '이미지 파일을 S3에 업로드하고 메타데이터를 저장합니다.',
    }),
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: '이미지 파일과 메타데이터',
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
            description:
              '업로드할 이미지 파일 (JPEG, PNG, GIF, WebP 지원, 최대 10MB)',
          },
          type: {
            type: 'string',
            enum: ['SURVEY', 'PROFILE', 'PRODUCT', 'GENERAL'],
            description:
              '이미지 사용 용도 / "SURVEY", "PROFILE", "PRODUCT", "GENERAL"',
            default: 'GENERAL',
          },
        },
        required: ['file'],
      },
    }),
    ApiResponse({
      status: 201,
      description: '이미지 업로드 성공',
      type: ImageModel,
      content: {
        'application/json': {
          example: {
            id: 1,
            type: 'SURVEY',
            url: 'https://bucket-name.s3.ap-northeast-2.amazonaws.com/images/survey/2025-05-29/uuid-filename.jpg',
            originalName: 'my-image.jpg',
            size: 1024000,
            mimeType: 'image/jpeg',
            createdAt: '2025-05-29T12:00:00.000Z',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청 - 파일 형식 불일치, 크기 초과 등',
      example: new BadRequestException('지원되지 않는 파일 형식입니다.'),
    }),
    ApiResponse({
      status: 401,
      description: '인증되지 않은 사용자',
      example: new UnauthorizedException('인증이 필요합니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(
        '이미지 업로드에 실패했습니다.',
      ),
    }),
  );
}

export function GetImageSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '이미지 조회',
      description: 'ID로 이미지 정보를 조회합니다.',
    }),
    ApiParam({
      name: 'id',
      description: '이미지 ID',
      type: 'number',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: '이미지 조회 성공',
      type: ImageModel,
    }),
    ApiResponse({
      status: 404,
      description: '이미지를 찾을 수 없음',
      example: new NotFoundException('이미지를 찾을 수 없습니다.'),
    }),
  );
}

export function GetUserImagesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '사용자 이미지 목록 조회',
      description: '현재 사용자가 업로드한 모든 이미지를 조회합니다.',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: '이미지 목록 조회 성공',
      type: [ImageModel],
    }),
    ApiResponse({
      status: 401,
      description: '인증되지 않은 사용자',
      example: new UnauthorizedException('인증이 필요합니다.'),
    }),
  );
}
