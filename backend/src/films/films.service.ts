import { Injectable, NotFoundException } from '@nestjs/common';
import FilmsRepository from '../repository/films.repository';
import {
  toAllFilmsResponseDTO,
  toScheduleSessionResponseDTO,
} from './dto/films.dto';

@Injectable()
export default class FilmsService {
  constructor(public readonly filmsRepository: FilmsRepository) {}

  public async getAllFilms() {
    const films = await this.filmsRepository.findAll();
    return toAllFilmsResponseDTO(films);
  }

  public async getFilmSchedule(id: string) {
    const film = await this.filmsRepository.findById(id);
    if (!film) throw new NotFoundException(`There is no movie for id: "${id}"`);
    return toScheduleSessionResponseDTO(film);
  }
}
