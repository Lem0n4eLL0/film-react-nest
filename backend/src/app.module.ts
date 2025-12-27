import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'node:path';

import configProvider from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { RepositoryModule } from './repository/repository.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('DATABASE_URL =', configService.get('DATABASE_URL'));
        return {
          uri: configService.get('DATABASE_URL'),
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    FilmsModule,
    OrderModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
