import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { AppConfig } from './app.config.provider';
import { ValidationPipe } from '@nestjs/common';
import LoggerFactory from './common/loggers/loggerFactory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get<AppConfig>('CONFIG');

  app.setGlobalPrefix('api/afisha');
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useLogger(LoggerFactory.createLogger(config.loggerType));
  await app.listen(config.port);
  // console.log(`srver listen on port: ${config.port}`);
}

bootstrap();
