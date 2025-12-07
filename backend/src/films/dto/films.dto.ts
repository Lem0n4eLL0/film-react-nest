export interface ScheduleSessionDTO {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface FilmDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: ScheduleSessionDTO[];
}

export interface FilmResponseDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
}

export interface ScheduleSessionResponseDTO {
  id: string;
  film: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface AllFilmsResponseDTO {
  total: number;
  items: FilmResponseDTO[];
}

export interface AllScheduleSessionResponseDTO {
  total: number;
  items: ScheduleSessionResponseDTO[];
}

export const toScheduleSessionDTO = (doc: any): ScheduleSessionDTO => ({
  id: doc.id,
  daytime: doc.daytime,
  hall: doc.hall,
  rows: doc.rows,
  seats: doc.seats,
  price: doc.price,
  taken: doc.taken || [],
});

export const toFilmDTO = (doc: any): FilmDTO => ({
  id: doc.id,
  rating: doc.rating,
  director: doc.director,
  tags: doc.tags || [],
  image: doc.image,
  cover: doc.cover,
  title: doc.title,
  about: doc.about,
  description: doc.description,
  schedule: (doc.schedule || []).map((s: any) => toScheduleSessionDTO(s)),
});

export const toScheduleSessionResponseDTO = (
  film: FilmDTO,
): AllScheduleSessionResponseDTO => ({
  total: film.schedule.length,
  items: film.schedule.map((el) => {
    return {
      film: film.id,
      id: el.id,
      daytime: el.daytime,
      hall: String(el.hall),
      rows: el.rows,
      seats: el.seats,
      price: el.price,
      taken: el.taken || [],
    };
  }),
});

export const toFilmResponseDTO = (doc: any): FilmResponseDTO => ({
  id: doc.id,
  rating: doc.rating,
  director: doc.director,
  tags: doc.tags || [],
  image: doc.image,
  cover: doc.cover,
  title: doc.title,
  about: doc.about,
  description: doc.description,
});

export const toAllFilmsResponseDTO = (
  film: FilmDTO[],
): AllFilmsResponseDTO => ({
  total: film.length,
  items: film.map(toFilmResponseDTO),
});
