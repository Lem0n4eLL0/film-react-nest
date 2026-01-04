import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import FilmsRepository from 'src/repository/films.repository';
import { FilmOrderDto } from './dto/order.dto';

@Injectable()
export default class OrderService {
  constructor(public readonly filmsRepository: FilmsRepository) {}

  async orderTickets(order: FilmOrderDto): Promise<FilmOrderDto> {
    const { tickets } = order;
    if (tickets.length === 0) return order;

    const filmId = tickets[0].film;
    const sessionId = tickets[0].session;

    const isSameSession = tickets.every(
      (t) => t.film === filmId && t.session === sessionId,
    );

    if (!isSameSession)
      throw new ConflictException(
        'All tickets must be for the same film and session',
      );

    const film = await this.filmsRepository.findById(filmId);
    if (!film) throw new NotFoundException(`Film not found: ${filmId}`);

    const sessionIndex = film.schedule.findIndex((s) => s.id === sessionId);
    if (sessionIndex === -1)
      throw new NotFoundException(`Session not found: ${sessionId}`);

    const session = film.schedule[sessionIndex];
    const seatKeys = tickets.map((ticket) => {
      if (ticket.row < 1 || ticket.row > session.rows) {
        throw new UnprocessableEntityException(`Invalid row: ${ticket.row}`);
      }
      if (ticket.seat < 1 || ticket.seat > session.seats) {
        throw new UnprocessableEntityException(`Invalid row: ${ticket.row}`);
      }
      return `${ticket.row}:${ticket.seat}`;
    });

    if (new Set(seatKeys).size !== seatKeys.length) {
      throw new ConflictException('Duplicate seats in order');
    }

    for (const seatKey of seatKeys) {
      if (session.taken.includes(seatKey)) {
        throw new ConflictException(`Seat ${seatKey} is already taken`);
      }
    }

    session.taken.push(...seatKeys);
    film.schedule[sessionIndex] = session;
    await this.filmsRepository.updateFilm(film);

    return order;
  }
}
