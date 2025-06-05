import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { SurveyGuide } from './surveyGuide.entity';
import { SurveyQuestion } from './surveyQuestion.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  SurveyGuideType,
  SurveyProductType,
  SurveyStatusType,
} from 'src/types';

@Entity()
export class Survey {
  @ApiProperty({
    description: '설문조사 폼 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description:
      '설문조사 상태값 - 1: BEFORE, 2: PROGRESS, 3: FINISH, 4: DELETED',
    example: 1,
    enum: SurveyStatusType,
  })
  @Column({ nullable: true, default: SurveyStatusType.BEFORE })
  status: SurveyStatusType;

  @ApiProperty({
    description: '설문조사 폼 제목',
    example: '고객 만족도 조사',
  })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({
    description: '설문조사 시작 시점',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  @Column({ nullable: true })
  startDate: Date;

  @ApiProperty({
    description: '설문조사 종료 시점',
    example: '2023-10-31T23:59:59.999Z',
    type: Date,
  })
  @Column({ nullable: true })
  endDate: Date;

  @ApiProperty({
    description:
      '결제된 상품 명 - 1:"BASIC", 2:"DELUXE", 3:"PREMIUM", 4:"PROFESSIONAL"',
    enum: SurveyProductType,
  })
  @Column({ nullable: true })
  product: SurveyProductType;

  @ApiProperty({
    description: '설문조사 폼 등록일',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: '설문조사 폼 수정일',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: '설문조사 작성자',
    example: 1,
    type: Number,
  })
  @Column()
  authorId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ApiProperty({
    description: '참가자 수',
    example: 24,
    type: Number,
  })
  @Column({ nullable: true, default: 0 })
  participantCount: number;

  @ApiProperty({
    description: '설문조사 폼 삭제 여부',
    example: false,
    type: Boolean,
  })
  @Column({ default: false })
  @Exclude()
  isDeleted: boolean;

  @OneToMany(() => SurveyGuide, (guide) => guide.survey)
  guides: SurveyGuide[];

  @OneToMany(
    () => SurveyQuestion,
    (question: SurveyQuestion) => question.survey,
    {
      cascade: true,
    },
  )
  questions: SurveyQuestion[];

  get header(): SurveyGuide | undefined {
    return this.guides?.find((guide) => guide.type === SurveyGuideType.HEADER);
  }

  get footer(): SurveyGuide | undefined {
    return this.guides?.find((guide) => guide.type === SurveyGuideType.FOOTER);
  }
}
