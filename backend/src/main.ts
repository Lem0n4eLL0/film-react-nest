import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { connect } from 'mongoose';
import { AppConfig } from './app.config.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<AppConfig>('CONFIG');

  app.setGlobalPrefix('api/afisha');
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await connect(config.database.url);
  await app.listen(config.port);
  // console.log(`srver listen on port: ${config.port}`);
}

bootstrap();
