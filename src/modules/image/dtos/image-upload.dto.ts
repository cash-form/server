import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { ImageCategoryType } from 'src/types';

export class ImageUploadDto {
  @ApiProperty({
    description:
      '이미지 사용 용도 타입 - 1: 설문조사, 2: 프로필, 3: 상품, 4: 공용 / 기본값 4 (일반)',
    example: 4,
    enum: ImageCategoryType,
    required: false,
    default: ImageCategoryType.GENERAL,
  })
  @IsOptional()
  @IsEnum(ImageCategoryType)
  type?: ImageCategoryType = ImageCategoryType.GENERAL;
}
