import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 4000);
    const environment = configService.get<string>('NODE_ENV', 'development');
    const allowedOrigins = configService
      .get<string>('ALLOWED_ORIGINS', '')
      .split(',');

    app.setGlobalPrefix('v1');

    // 보안 헤더 설정 - Swagger UI와의 호환성을 위해 일부 옵션 조정
    app.use(
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === 'production' ? undefined : false,
        crossOriginEmbedderPolicy: process.env.NODE_ENV === 'production',
        crossOriginOpenerPolicy:
          process.env.NODE_ENV === 'production'
            ? undefined
            : { policy: 'same-origin-allow-popups' },
      }),
    );

    app.enableCors({
      origin: (origin, callback) => {
        if (!origin || !allowedOrigins.includes(origin)) {
          logger.warn(`CORS 거부: ${origin} 도메인에서의 요청`);
          callback(new Error('Not allowed by CORS'));
        }

        return callback(null, true);
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // Validation Pipe 설정
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Swagger 설정
    const config = new DocumentBuilder()
      .setTitle('인증 API')
      .setDescription('사용자 인증 및 토큰 관리 API 문서')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        swagger: {
          schemes: ['http'],
        },
      },
    });

    // Graceful Shutdown 설정
    const signals = ['SIGTERM', 'SIGINT'];
    for (const signal of signals) {
      process.on(signal, async () => {
        logger.log(`${signal} 신호를 받았습니다. 애플리케이션 종료 중...`);
        await app.close();
        logger.log('애플리케이션이 정상적으로 종료되었습니다.');
        process.exit(0);
      });
    }

    await app.listen(port);
    logger.log(
      `애플리케이션이 ${environment} 환경에서 ${port}번 포트로 실행되었습니다.`,
    );
  } catch (error) {
    logger.error(`애플리케이션 시작 중 오류가 발생했습니다: ${error.message}`);
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error(
    '치명적인 오류로 인해 애플리케이션이 시작되지 않았습니다:',
    err,
  );
  process.exit(1);
});
