import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { FilmMongo } from 'src/entities/mongodb/films.entity';
import { FilmPostgres } from 'src/entities/postgres/films.entity';
import { SchedulePostgres } from 'src/entities/postgres/schedule.entity';
import { Driver } from 'src/app.config.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const driver = config.get<Driver>('DATABASE_DRIVER');

        if (driver === 'postgres') {
          return {
            type: 'postgres',
            url: config.get('DATABASE_URL'),
            entities: [FilmPostgres, SchedulePostgres],
            synchronize: true,
          };
        }

        if (driver === 'mongodb') {
          return {
            type: 'mongodb',
            url: config.get('DATABASE_URL'),
            useUnifiedTopology: true,
            entities: [FilmMongo],
            synchronize: true,
          };
        }

        throw new Error('Unsupported DATABASE_DRIVER');
      },
    }),
  ],
})
export class TypeOrmConfigModule {}
