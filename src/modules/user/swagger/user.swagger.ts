import {
  applyDecorators,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BooleanResponseType } from 'src/types';
import { User } from '../entities/user.entity';

export function CheckDuplicateAccountSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '내 정보 조회',
      description: '토큰으로 인증하여 본인의 정보를 조회합니다.',
    }),

    ApiResponse({
      status: 200,
      description: '성공',
      example: {
        id: 1,
        email: 'user123@email.com',
        nickname: 'user123',
        status: 1,
        userType: 1,
      },
    }),
    ApiResponse({
      status: 400,
      description: '토큰을 받지 못함',
      example: new BadRequestException('토큰이 없어 확인이 불가능합니다.'),
    }),
    ApiResponse({
      status: 404,
      description: '없는 토큰',
      example: new NotFoundException('계정을 찾을 수 없습니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}

export function CheckDuplicateEmailSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '중복 이메일 확인',
      description: '이메일을 확인하여 중복 여부를 반환합니다.',
    }),
    ApiQuery({
      name: 'email',
      required: true,
      description: '확인할 이메일',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: '사용 가능',
      example: new BooleanResponseType(),
    }),
    ApiResponse({
      status: 400,
      description: '파라미터 잘못됨',
      example: new BadRequestException('이메일을 입력해주세요.'),
    }),
    ApiResponse({
      status: 409,
      description: '이미 존재하는 이메일',
      example: new ConflictException('이미 존재하는 이메일입니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}

export function CheckDuplicateNicknameSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '중복 닉네임 확인',
      description: '닉네임을 확인하여 중복 여부를 반환합니다.',
    }),
    ApiQuery({
      name: 'nickname',
      required: true,
      description: '확인할 닉네임',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: '사용 가능',
      example: new BooleanResponseType(),
    }),
    ApiResponse({
      status: 400,
      description: '파라미터 잘못됨',
      example: new BadRequestException('닉네임을 입력해주세요.'),
    }),
    ApiResponse({
      status: 409,
      description: '이미 존재하는 닉네임',
      example: new ConflictException('이미 존재하는 닉네임입니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}

export function FindMeSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: '현재 사용자 조회',
      description: '인증된 사용자의 정보를 반환합니다.',
    }),
    ApiResponse({
      status: 200,
      description: '조회 성공',
      type: User,
      example: { id: 1, email: 'user123@email.com' },
    }),
    ApiResponse({
      status: 401,
      description: '유효하지 않은 토큰',
      example: new UnauthorizedException('인증정보가 유효하지 않습니다.'),
    }),
    ApiResponse({
      status: 403,
      description: '탈퇴한 사용자',
      example: new NotFoundException('계정이 없거나 탈퇴한 사용자입니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}

export function DeleteUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: '회원탈퇴',
      description: '현재 사용자를 탈퇴 처리합니다.',
    }),
    ApiResponse({
      status: 204,
      description: '탈퇴 성공',
    }),
    ApiResponse({
      status: 401,
      description: '유효하지 않은 토큰',
      example: new UnauthorizedException('인증정보가 유효하지 않습니다.'),
    }),
    ApiResponse({
      status: 403,
      description: '이미 탈퇴한 사용자',
      example: new NotFoundException('계정이 없거나 탈퇴한 사용자입니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}
