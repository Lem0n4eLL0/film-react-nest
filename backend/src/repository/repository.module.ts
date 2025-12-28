import { Global, Module } from '@nestjs/common';
import FilmsRepository from './films.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema } from 'src/films/schemas/film.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])],
  providers: [FilmsRepository],
  exports: [FilmsRepository],
})
export class RepositoryModule {}
