import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Survey } from './survey.entity';
import { SurveyGuideType } from 'src/types';

@Entity()
export class SurveyGuide {
  @ApiProperty({
    description: '가이드 ID',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '가이드 타입 - 1: HEADER, 2: FOOTER',
    enum: SurveyGuideType,
    example: 1,
  })
  @Column()
  type: SurveyGuideType;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: '가이드 텍스트 (최대 1000자)',
    example: '응답해주셔서 감사합니다.',
  })
  text: string;

  @ApiProperty({
    description: '가이드에 포함될 이미지 리스트',
    example: ['image1.png', 'image2.png'],
  })
  @Column('simple-array', { nullable: true })
  images: string[];

  @ManyToOne(() => Survey, (survey) => survey.guides, { onDelete: 'CASCADE' })
  @JoinColumn()
  survey: Survey;
}
