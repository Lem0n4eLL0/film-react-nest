import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { FilmPostgres } from './films.entity';

@Entity('schedule')
export class SchedulePostgres {
  @PrimaryColumn()
  id: string;

  @Column()
  daytime: Date;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column()
  price: number;

  @Column('text', { array: true })
  taken: string[];

  @ManyToOne(() => FilmPostgres, (film) => film.schedule, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'film_id' })
  film: FilmPostgres;
}
