import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatusType } from 'src/types';

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
    description: '사용자 닉네임',
    example: '홍길동',
  })
  @Column()
  nickname: string;

  @ApiProperty({
    description:
      '사용자 상태값 0: 승인대기, 1: 승인완료, 2: 거부, 3: 제명, 4: 탈퇴',
    example: 0,
    type: Number,
  })
  @Column({ default: 0 })
  status: UserStatusType;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({ default: false })
  @Exclude()
  isDeleted: boolean;
}
