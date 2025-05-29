import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SurveyGuideDto {
  @ApiProperty({
    description: '안내 텍스트',
    example: '안녕하세요! 저희 서비스에 대한 만족도 조사입니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  text: string = '';

  @ApiProperty({
    description: '안내 이미지 URL 목록',
    example: ['https://example.com/header-image.jpg'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  images: string[] = [];
}
