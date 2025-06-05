import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { ImageCategoryType } from 'src/types';

@Entity()
export class Image {
  @ApiProperty({
    description: '이미지 아이디',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description:
      '이미지 사용 용도 타입 - 1: SURVEY, 2: PROFILE, 3: PRODUCT, 4: GENERAL',
    enum: ImageCategoryType,
    example: 1,
  })
  @Column({ nullable: false })
  type: ImageCategoryType;

  @ApiProperty({
    description: '이미지 URL',
    example: 'https://example.com/image.png',
  })
  @Column({ nullable: false })
  url: string;

  @ApiProperty({
    description: '원본 파일명',
    example: 'my-image.jpg',
  })
  @Column({ nullable: false })
  originalName: string;

  @ApiProperty({
    description: '파일 크기 (bytes)',
    example: 1024000,
  })
  @Column({ nullable: false })
  size: number;

  @ApiProperty({
    description: '파일 MIME 타입',
    example: 'image/jpeg',
  })
  @Column({ nullable: false })
  mimeType: string;

  @ApiProperty({
    description: '업로드한 사용자 ID',
    example: 1,
  })
  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    description: '생성일시',
    example: '2023-10-01T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}
