import {
  Controller,
  UseGuards,
  Req,
  Post,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../services/image.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types';
import {
  UploadImageSwagger,
  GetImageSwagger,
  GetUserImagesSwagger,
  DeleteImageSwagger,
} from '../swagger/image.swagger';
import ImageModel from '../models/image.model';
import { ImageUploadDto } from '../dtos/image-upload.dto';

@ApiTags('이미지')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @UploadImageSwagger()
  async uploadImage(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: ImageUploadDto,
  ): Promise<ImageModel> {
    if (!file) {
      throw new BadRequestException('파일이 제공되지 않았습니다.');
    }

    const userId = req.user.sub;
    return await this.imageService.uploadImage(userId, file, uploadDto);
  }

  @Get(':id')
  @GetImageSwagger()
  async getImage(@Param('id', ParseIntPipe) id: number): Promise<ImageModel> {
    const image = await this.imageService.getImageById(id);
    if (!image) {
      throw new NotFoundException('이미지를 찾을 수 없습니다.');
    }
    return image;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @GetUserImagesSwagger()
  async getUserImages(@Req() req: AuthenticatedRequest): Promise<ImageModel[]> {
    const userId = req.user.sub;
    return await this.imageService.getUserImages(userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @DeleteImageSwagger()
  async deleteImage(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    const userId = req.user.sub;
    return await this.imageService.deleteImage(userId, id);
  }
}
