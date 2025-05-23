import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
  password: string;
}
