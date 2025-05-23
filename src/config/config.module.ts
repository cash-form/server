import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './env';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
      validationOptions: {
        abortEarly: false, // 모든 오류를 한 번에 표시
      },
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().required(),
        ALLOWED_ORIGINS: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('1d'),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
        // DB 설정 검증
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DIALECT: Joi.string()
          .valid('mysql', 'postgres', 'mariadb', 'sqlite')
          .required(),
        DB_SYNC: Joi.string().valid('true', 'false').default('false'),
        DB_LOGGING: Joi.string().valid('true', 'false').default('true'),
      }),
    }),
  ],
})
export class AppConfigModule {}
