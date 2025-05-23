import {
  IsBoolean,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: '닉네임 / 2자 ~ 8자 / 특수문자 언더바 외 불가능',
    example: '홍길동_123',
  })
  @IsString()
  @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
  @MaxLength(8, { message: '닉네임은 최대 8자 이하이어야 합니다.' })
  nickname: string;

  @ApiProperty({
    description: '계정 이메일',
    example: 'user123@email.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: '비밀번호 (영문, 숫자, 특수문자 포함)',
    example: 'pass123!',
  })
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, {
    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;

  @ApiProperty({
    description: '마케팅 동의 여부',
    example: true,
    required: true,
  })
  @IsBoolean()
  marketingConsent: boolean;

  @ApiProperty({
    description: '뉴스레터 동의 여부',
    example: true,
    required: true,
  })
  @IsBoolean()
  newsletterConsent: boolean;
}
