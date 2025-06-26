import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export default class CreditModel {
  @ApiProperty({
    description: '설문조사 폼 ID',
    example: 1,
  })
  @Expose()
  id: number;
}
