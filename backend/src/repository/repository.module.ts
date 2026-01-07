import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import FilmsRepository from './films.repository';
import { FilmPostgres } from 'src/entities/postgres/films.entity';
import { SchedulePostgres } from 'src/entities/postgres/schedule.entity';
import { FilmMongo } from 'src/entities/mongodb/films.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([FilmPostgres, SchedulePostgres, FilmMongo]),
  ],
  providers: [FilmsRepository],
  exports: [FilmsRepository],
})
export class RepositoryModule {}
