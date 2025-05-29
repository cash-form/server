import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';

export enum ImageType {
  SURVEY = 'SURVEY',
  PROFILE = 'PROFILE',
  PRODUCT = 'PRODUCT',
  GENERAL = 'GENERAL',
}

export class ImageUploadDto {
  @ApiProperty({
    description: '이미지 사용 용도 타입',
    example: 'SURVEY',
    enum: ImageType,
    required: false,
    default: ImageType.GENERAL,
  })
  @IsOptional()
  @IsEnum(ImageType)
  type?: ImageType = ImageType.GENERAL;
}
