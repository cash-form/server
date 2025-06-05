import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export default class PaginationDto {
  @ApiProperty({
    description: '페이지 번호',
    example: 1,
    minimum: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public readonly page: number = 1;

  @ApiProperty({
    description: '페이지당 항목 수',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  public readonly size: number = 10;

  @ApiProperty({
    description: '정렬 기준 필드',
    example: 'createdAt',
    default: 'createdAt',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly sort: string = 'createdAt';

  @ApiProperty({
    description: '정렬 순서',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly order: 'ASC' | 'DESC' = 'DESC';

  @ApiProperty({
    description: '검색 키워드',
    example: '',
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly keyword: string = '';
}
