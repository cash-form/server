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
import UserModel from '../models/user.model';

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
      type: Boolean,
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
      type: String,
      description: '확인할 닉네임',
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
      type: UserModel,
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
      description: '현재 사용자를 탈퇴 처리합니다. (soft delete)',
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
