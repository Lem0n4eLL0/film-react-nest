//TODO реализовать DTO для /orders

export interface IFilmOrder {
  email: string;
  phone: string;
  tickets: ITicket[];
}

export interface ITicket {
  film: string;
  session: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
}
