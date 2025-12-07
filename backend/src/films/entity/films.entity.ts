export const FILMS_TAGS = ['Документальный', 'Рекомендуемые'] as const;
export type FilmsTags = (typeof FILMS_TAGS)[number];
export type ID = string;

export interface IScheduleSession {
  id: ID;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: Array<ID>;
}

export interface IFilm {
  id: ID;
  rating: number;
  director: string;
  tags: Array<FilmsTags>;
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: Array<IScheduleSession>;
}
