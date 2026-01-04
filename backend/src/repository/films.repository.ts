import { Injectable } from '@nestjs/common';
import { Driver } from 'src/app.config.provider';
import { FilmMongo } from 'src/entities/mongodb/films.entity';
import { FilmPostgres } from 'src/entities/postgres/films.entity';
import { FilmDTO, toFilmDTO } from 'src/films/dto/films.dto';
import { DataSource, MongoRepository, Repository } from 'typeorm';

@Injectable()
export default class FilmsRepository {
  private readonly repo: Repository<any> | MongoRepository<any>;
  private readonly driver: Driver;

  constructor(private readonly dataSource: DataSource) {
    this.driver = process.env.DATABASE_DRIVER as Driver;
    this.repo =
      this.driver === 'mongodb'
        ? dataSource.getMongoRepository(FilmMongo)
        : dataSource.getRepository(FilmPostgres);
  }

  async findAll() {
    const films = await this.repo.find();
    return films.map(toFilmDTO);
  }

  async findById(id: string) {
    const film = await this.repo.findOne({ where: { id } });
    return film ? toFilmDTO(film) : null;
  }

  async updateFilm(film: FilmDTO): Promise<void> {
    if (this.driver === 'mongodb') {
      await (this.repo as MongoRepository<any>).findOneAndUpdate(
        { id: film.id },
        { $set: film },
      );
      return;
    }
    await this.repo.save(film);
  }
}
