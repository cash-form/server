import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './database/typeorm.config';
import { PingModule } from './modules/ping/ping.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SurveyModule } from './modules/survey/survey.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    // 기존 ConfigModule 대신 커스텀 AppConfigModule 사용
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d'),
        },
      }),
      inject: [ConfigService],
      global: true, // 글로벌로 설정
    }),
    PingModule,
    AuthModule,
    UserModule,
    SurveyModule,
    ImageModule,
  ],
})
export class AppModule {}
