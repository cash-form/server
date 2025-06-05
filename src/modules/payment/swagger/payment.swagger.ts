import {
  applyDecorators,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { PaymentDto } from '../dtos/payment.dto';
import PaymentModel from '../models/payment.model';

export function InsertPaymentSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '결제성공 후 결제처리',
      description: '네이버페이 결제 성공 후 데이터 처리',
    }),
    ApiBearerAuth(),
    ApiBody({
      description: '결제정보',
      type: PaymentDto,
    }),
    ApiResponse({
      status: 201,
      description: '결제 성공',
      type: PaymentModel,
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청 - 결제 정보가 유효하지 않음',
      example: new BadRequestException('결제 정보가 유효하지 않습니다.'),
    }),
    ApiResponse({
      status: 403,
      description: '접근 권한 없음 - 인증되지 않은 사용자',
      example: new ForbiddenException('사용자 인증 정보를 확인할 수 없습니다.'),
    }),
    ApiResponse({
      status: 404,
      description: '사용자 찾지 못함',
      example: new NotFoundException('요청한 사용자를 찾을 수 없습니다.'),
    }),
    ApiResponse({
      status: 404,
      description: '이미 처리된 결제',
      example: new ConflictException('이미 처리된 결제입니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류 - 결제 처리 중 오류 발생',
      example: new InternalServerErrorException(
        '결제 처리 중 서버 오류가 발생했습니다.',
      ),
    }),
  );
}
