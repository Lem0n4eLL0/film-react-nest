import { Controller, Get, Injectable, Param } from '@nestjs/common';
import FilmsService from './films.service';

@Injectable()
@Controller('films')
export default class FilmsController {
  constructor(public readonly filmsServise: FilmsService) {}

  @Get('')
  public findAll() {
    return this.filmsServise.getAllFilms();
  }

  @Get(':id/schedule')
  public findById(@Param('id') id: string) {
    return this.filmsServise.getFilmSchedule(id);
  }
}
