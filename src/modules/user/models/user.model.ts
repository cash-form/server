import { ApiProperty } from '@nestjs/swagger';
import { UserStatusType, UserType } from 'src/types';

export default class UserModel {
  @ApiProperty({
    description: '고유 아이디',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '계정 이메일',
    example: 'user123@email.com',
  })
  email: string;

  @ApiProperty({
    description: '유저 닉네임',
    example: 'user123',
  })
  nickname: string;

  @ApiProperty({
    description: '계정 상태',
    example: 1,
  })
  status: UserStatusType;

  @ApiProperty({
    description: '계정 타입',
    example: 1,
  })
  userType: UserType;
}
