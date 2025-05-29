import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Image } from './entities/image.entity';
import { ImageService } from './services/image.service';
import { ImageController } from './controllers/image.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image, User]),
    forwardRef(() => AuthModule),
    ConfigModule,
  ],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImageModule {}
