import { ApiProperty } from '@nestjs/swagger';
import UserModel from 'src/modules/user/models/user.model';

export default class SurveyListModel {
  @ApiProperty({
    description: '설문조사 폼 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '설문조사 폼 제목',
    example: '고객 만족도 조사',
  })
  title: string;

  @ApiProperty({
    description: '설문조사 시작 시점',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  startDate: Date;

  @ApiProperty({
    description: '설문조사 종료 시점',
    example: '2023-10-31T23:59:59.999Z',
    type: Date,
  })
  endDate: Date;

  @ApiProperty({
    description: '참여보상',
    example: 200,
    type: Number,
  })
  credit: number;

  @ApiProperty({
    description: '설문조사 폼 등록일',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: '설문조사 폼 수정일',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    description: '설문조사 작성자',
    example: new UserModel(),
    type: UserModel,
  })
  author: UserModel;

  @ApiProperty({
    description: '참여자 수',
    example: 41,
    type: Number,
  })
  participantCount: number;
}
