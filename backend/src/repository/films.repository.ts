import { Injectable } from '@nestjs/common';
import Film from '../films/schemas/film.schema';
import { FilmDTO, toFilmDTO } from 'src/films/dto/films.dto';

@Injectable()
export default class FilmsRepository {
  async findAll(): Promise<FilmDTO[]> {
    const docs = await Film.find().lean();
    return docs.map(toFilmDTO);
  }

  async findById(id: string): Promise<FilmDTO | null> {
    const doc = await Film.findOne({ id }).lean();
    return doc ? toFilmDTO(doc) : null;
  }

  async updateFilm(film: FilmDTO): Promise<void> {
    await Film.findOneAndUpdate({ id: film.id }, film);
  }
}
