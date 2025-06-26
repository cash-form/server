import {
  applyDecorators,
  BadRequestException,
  ForbiddenException,
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
      description: '이미지 파일과 메타데이터 두 컬럼으로 구성된 폼데이터',
      examples: {
        file: {
          value: {
            name: 'my-image.jpg',
            type: 'image/jpeg',
            size: 1024000,
            data: 'base64-encoded-image-data',
          },
          description: '업로드할 이미지 파일',
        },
        type: {
          description:
            '이미지 사용 용도 타입 - 1: 설문조사, 2: 프로필, 3: 상품, 4: 공용 / 기본값 4 (일반)',
          value: 4,
        },
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

export function DeleteImageSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '이미지 삭제',
      description: '이미지를 영구적으로 삭제합니다. (hard delete)',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 204,
      description: '삭제 성공',
    }),
    ApiResponse({
      status: 403,
      description: '해당 이미지 삭제권한 없음',
      example: new ForbiddenException('이미지를 삭제할 권한이 없습니다.'),
    }),
    ApiResponse({
      status: 404,
      description: '이미지 확인 불가능',
      example: new NotFoundException(
        '해당 이미지는 이미 삭제되었거나 존재하지 않습니다.',
      ),
    }),
    ApiResponse({
      status: 500,
      description: '서버 에러',
      example: new InternalServerErrorException(
        '삭제과정에서 서버문제가 발생했습니다.',
      ),
    }),
  );
}
