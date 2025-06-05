import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Survey } from './survey.entity';
import { SurveyQuestionType } from 'src/types';

@Entity()
export class SurveyQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({
    description:
      '질문 유형 - 1: 객관식, 2: 주관식, 3: 서술형, 4: OX, 5: 포인트',
    enum: SurveyQuestionType,
    example: 1,
  })
  type: SurveyQuestionType;

  @Column()
  @ApiProperty({
    description: '질문 제목',
    example: '당신의 연령대는?',
  })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: '질문 내용',
    example: '귀하의 연령대에 해당하는 항목을 선택해주세요.',
  })
  text: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: '객관식 질문의 복수 선택 개수',
    example: 1,
  })
  multipleCount: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: '주관식/서술형 질문의 최대 글자수',
    example: 1000,
  })
  maxLength: number;

  @ApiProperty({
    description: '질문에 포함될 이미지 리스트',
    example: ['image1.png', 'image2.png'],
  })
  @Column('simple-array', { nullable: true })
  images: string[];

  @ApiProperty({
    description: '객관식 또는 포인트 질문의 선택지 목록',
    example: ['20대', '30대', '40대', '50대 이상'],
  })
  @Column('simple-array', { nullable: true })
  options: string[];

  @Column({ nullable: false, default: 0 })
  orderIndex: number;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  @JoinColumn()
  survey: Survey;
}
