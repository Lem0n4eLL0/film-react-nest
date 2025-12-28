import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDTO, toFilmDTO } from 'src/films/dto/films.dto';
import { IFilm } from 'src/films/entity/films.entity';

@Injectable()
export default class FilmsRepository {
  constructor(
    @InjectModel('Film')
    private readonly filmModel: Model<IFilm>,
  ) {}

  async findAll(): Promise<FilmDTO[]> {
    const docs = await this.filmModel.find().lean();
    return docs.map(toFilmDTO);
  }

  async findById(id: string): Promise<FilmDTO | null> {
    const doc = await this.filmModel.findOne({ id }).lean();
    return doc ? toFilmDTO(doc) : null;
  }

  async updateFilm(film: FilmDTO): Promise<void> {
    await this.filmModel.findOneAndUpdate({ id: film.id }, film);
  }
}
