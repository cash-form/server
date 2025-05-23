import {
  IsString,
  Matches,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: '계정 이메일 (5자 이상, 영문 또는 숫자)',
    example: 'user123@email.com',
  })
  @IsString()
  @MinLength(5)
  email: string;

  @ApiProperty({
    description: '닉네임',
    example: '홍길동',
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    description: '비밀번호 (8자 이상, 영문, 숫자, 특수문자 포함)',
    example: 'pass123!',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/, {
    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;

  @ApiProperty({
    description: '마케팅 정보 수신 동의',
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  marketingConsent?: boolean;

  @ApiProperty({
    description: '뉴스레터 수신 동의',
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  newsletterConsent?: boolean;
}
