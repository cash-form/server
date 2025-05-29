import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '', 10),
  environment: process.env.NODE_ENV || 'development',
  allowedOrigins: process.env.ALLOWED_ORIGINS ?? ''.split(','),
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '',
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    type: process.env.DB_DIALECT || 'mysql',
    synchronize: process.env.DB_SYNC === 'true',
    logging: process.env.DB_LOGGING !== 'false',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'ap-northeast-2',
    s3: {
      bucketName: process.env.AWS_S3_BUCKET_NAME,
    },
  },
}));
