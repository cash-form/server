import { getImageCategoryName } from './../../../types/index';
import { ImageCategoryType } from 'src/types';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Image } from '../entities/image.entity';
import { ImageUploadDto } from '../dtos/image-upload.dto';
import ImageModel from '../models/image.model';

@Injectable()
export class ImageService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly configService: ConfigService,
  ) {
    const awsConfig = this.configService.get('app.aws');
    this.bucketName = awsConfig.s3.bucketName;

    this.s3Client = new S3Client({
      region: awsConfig.region,
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
    });
  }

  async uploadImage(
    userId: number,
    file: Express.Multer.File,
    uploadDto: ImageUploadDto,
  ): Promise<ImageModel> {
    // 파일 유효성 검증
    this.validateImageFile(file);

    try {
      // S3에 파일 업로드
      const imageType = uploadDto.type || ImageCategoryType.GENERAL;
      const s3Key = this.generateS3Key(file.originalname, imageType);
      const s3Url = await this.uploadToS3(file, s3Key);

      // 데이터베이스에 이미지 정보 저장
      const image = this.imageRepository.create({
        type: imageType,
        url: s3Url,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        userId,
      });

      const savedImage = await this.imageRepository.save(image);

      return {
        id: savedImage.id,
        type: savedImage.type,
        url: savedImage.url,
        originalName: savedImage.originalName,
        size: savedImage.size,
        mimeType: savedImage.mimeType,
        createdAt: savedImage.createdAt,
      };
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      throw new InternalServerErrorException('이미지 업로드에 실패했습니다.');
    }
  }

  private validateImageFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('파일이 제공되지 않았습니다.');
    }

    // 파일 크기 검증 (10MB 제한)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('파일 크기는 10MB를 초과할 수 없습니다.');
    }

    // MIME 타입 검증
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        '지원되지 않는 파일 형식입니다. JPEG, PNG, GIF, WebP 파일만 업로드 가능합니다.',
      );
    }
  }

  private generateS3Key(originalName: string, type: ImageCategoryType): string {
    const extension = originalName.split('.').pop();
    const fileName = `${uuidv4()}.${extension}`;
    const folder = getImageCategoryName(type).toLowerCase();
    const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    return `images/${folder}/${timestamp}/${fileName}`;
  }

  private async uploadToS3(
    file: Express.Multer.File,
    key: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    });

    await this.s3Client.send(command);

    // S3 URL 생성
    const region = this.configService.get('app.aws.region');
    return `https://${this.bucketName}.s3.${region}.amazonaws.com/${key}`;
  }

  async getImageById(imageId: number): Promise<ImageModel | null> {
    const image = await this.imageRepository.findOne({
      where: { id: imageId },
    });

    if (!image) {
      return null;
    }

    return {
      id: image.id,
      type: image.type,
      url: image.url,
      originalName: image.originalName,
      size: image.size,
      mimeType: image.mimeType,
      createdAt: image.createdAt,
    };
  }

  async getUserImages(userId: number): Promise<ImageModel[]> {
    const images = await this.imageRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return images.map((image) => ({
      id: image.id,
      type: image.type,
      url: image.url,
      originalName: image.originalName,
      size: image.size,
      mimeType: image.mimeType,
      createdAt: image.createdAt,
    }));
  }

  async deleteImage(userId: number, imageId: number): Promise<void> {
    const image = await this.imageRepository.findOne({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException(
        '해당 이미지는 이미 삭제되었거나 존재하지 않습니다.',
      );
    }

    if (+image.userId !== +userId) {
      throw new ForbiddenException('해당 이미지를 삭제할 권한이 없습니다.');
    }

    // S3에서 이미지 삭제
    const s3Key = image.url.split('/').slice(-2).join('/');
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: s3Key,
    });

    try {
      await this.s3Client.send(command);
      await this.imageRepository.remove(image);

      return;
    } catch (error) {
      console.error('S3 이미지 삭제 오류:', error);
      throw new InternalServerErrorException(
        '삭제과정에서 서버문제가 발생했습니다.',
      );
    }
  }
}
