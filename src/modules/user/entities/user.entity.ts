import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatusType, UserType } from 'src/types';
import { MaxLength, MinLength } from 'class-validator';

@Entity()
export class User {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '사용자 계정명',
    example: 'user123',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description:
      '사용자 닉네임 / 2자 ~ 8자 / 공백불가능 / 특수문자 언더바 외 불가능',
    example: '홍길동_123',
  })
  @Column({ unique: true })
  @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
  @MaxLength(8, { message: '닉네임은 최대 8자 이하이어야 합니다.' })
  nickname: string;

  @ApiProperty({
    description: '사용자 상태값 1: 정상, 2: 제명, 3: 탈퇴',
    example: 1,
    type: Number,
  })
  @Column({ default: 1 })
  status: UserStatusType;

  @ApiProperty({
    description: '1: 일반, 2: 사업자, 3: 관리자',
    example: 1,
    type: Number,
  })
  @Column({ default: 1 })
  userType: UserType;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({ default: false })
  @Exclude()
  isDeleted: boolean;

  @Column({ default: false })
  marketingConsent: boolean;

  @Column({ default: false })
  newsletterConsent: boolean;

  @ApiProperty({
    description: '가입일시',
    example: '2023-10-01T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty({
    description: '업데이트일시',
    example: '2023-10-01T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: string;
}
