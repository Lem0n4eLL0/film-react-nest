import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { SchedulePostgres } from './schedule.entity';

@Entity('films')
export class FilmPostgres {
  @PrimaryColumn()
  id: string;

  @Column('float')
  rating: number;

  @Column()
  director: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  image: string;

  @Column()
  cover: string;

  @Column()
  title: string;

  @Column('text')
  about: string;

  @Column('text', { nullable: true })
  description?: string;

  @OneToMany(() => SchedulePostgres, (s) => s.film, {
    cascade: true,
    eager: true,
  })
  schedule: SchedulePostgres[];
}
