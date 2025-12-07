import { BadRequestException, Injectable } from '@nestjs/common';
import FilmsRepository from 'src/repository/films.repository';
import { IFilmOrder } from './dto/order.dto';

@Injectable()
export default class OrderService {
  constructor(public readonly filmsRepository: FilmsRepository) {}

  async orderTickets(order: IFilmOrder): Promise<IFilmOrder> {
    const { tickets } = order;
    if (tickets.length === 0) return order;

    const filmId = tickets[0].film;
    const sessionId = tickets[0].session;

    const isSameSession = tickets.every(
      (t) => t.film === filmId && t.session === sessionId,
    );

    if (!isSameSession)
      throw new BadRequestException(
        'All tickets must be for the same film and session',
      );

    const film = await this.filmsRepository.findById(filmId);
    if (!film) throw new BadRequestException(`Film not found: ${filmId}`);

    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session)
      throw new BadRequestException(`Session not found: ${sessionId}`);

    const seatKeys = tickets.map((ticket) => {
      if (ticket.row < 1 || ticket.row > session.rows) {
        throw new BadRequestException(`Invalid row: ${ticket.row}`);
      }
      if (ticket.seat < 1 || ticket.seat > session.seats) {
        throw new BadRequestException(`Invalid seat: ${ticket.seat}`);
      }
      return `${ticket.row}:${ticket.seat}`;
    });

    if (new Set(seatKeys).size !== seatKeys.length) {
      throw new BadRequestException('Duplicate seats in order');
    }

    for (const seatKey of seatKeys) {
      if (session.taken.includes(seatKey)) {
        throw new BadRequestException(`Seat ${seatKey} is already taken`);
      }
    }

    session.taken.push(...seatKeys);
    await this.filmsRepository.updateFilm(film);

    return order;
  }
}
