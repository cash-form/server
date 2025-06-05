import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserStatusType, UserType } from 'src/types';

export default class UserDetailModel {
  @ApiProperty({
    description: '고유 아이디',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: '계정 이메일',
    example: 'user123@email.com',
  })
  @Exclude()
  email: string;

  @ApiProperty({
    description: '유저 닉네임',
    example: 'user123',
  })
  @Expose()
  nickname: string;

  @ApiProperty({
    description: '계정 상태',
    example: 1,
  })
  @Exclude()
  status: UserStatusType;

  @ApiProperty({
    description: '계정 타입',
    example: 1,
  })
  @Expose()
  userType: UserType;

  @Exclude()
  marketingConsent: boolean = false;

  @Exclude()
  newsletterConsent: boolean = false;

  @Exclude()
  createdAt: string = '';

  @Exclude()
  updatedAt: string = '';
}
