import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationModel<T> {
  @ApiProperty({
    description: '데이터리스트',
    example: [],
  })
  @Expose()
  list: T[] = [];

  @ApiProperty({
    description: '총 데이터 개수',
    example: 100,
  })
  @Expose()
  total: number;

  @ApiProperty({
    description: '현재 페이지 수',
    example: 10,
  })
  @Expose()
  page: number;

  @ApiProperty({
    description: '페이지당 항목 수',
    example: 10,
  })
  @Expose()
  size: number;
}
