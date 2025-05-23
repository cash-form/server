import { ApiProperty } from '@nestjs/swagger';
import { UserStatusType, UserType } from 'src/types';

export default class UserModel {
  @ApiProperty({
    description: '계정 이메일',
    example: 'user123@email.com',
  })
  id: number;
  @ApiProperty({
    description: '계정 이메일',
    example: 'user123@email.com',
  })
  email: string;
  @ApiProperty({
    description: '계정 이메일',
    example: 'user123@email.com',
  })
  nickname: string;
  @ApiProperty({
    description: '계정 이메일',
    example: 'user123@email.com',
  })
  status: UserStatusType;
  @ApiProperty({
    description: '계정 이메일',
    example: 'user123@email.com',
  })
  userType: UserType;
}
