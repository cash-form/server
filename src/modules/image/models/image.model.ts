import { ApiProperty } from '@nestjs/swagger';
import { ImageCategoryType } from 'src/types';

export default class ImageModel {
  @ApiProperty({
    description: '이미지 아이디',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description:
      '이미지 사용 용도 타입 - 1: 설문조사, 2: 프로필, 3: 상품, 4: 공용',
    example: 1,
    enum: ImageCategoryType,
  })
  type: ImageCategoryType;

  @ApiProperty({
    description: '이미지 URL',
    example: 'https://example.com/image.png',
  })
  url: string;

  @ApiProperty({
    description: '원본 파일명',
    example: 'my-image.jpg',
  })
  originalName: string;

  @ApiProperty({
    description: '파일 크기 (bytes)',
    example: 1024000,
  })
  size: number;

  @ApiProperty({
    description: '파일 MIME 타입',
    example: 'image/jpeg',
  })
  mimeType: string;

  @ApiProperty({
    description: '생성일시',
    example: '2023-10-01T12:00:00Z',
  })
  createdAt: Date;
}
