import { Entity, Column, ObjectIdColumn } from 'typeorm';

export type ScheduleSession = {
  id: string;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
};

@Entity('films')
export class FilmMongo {
  @ObjectIdColumn()
  _id: string;

  @Column()
  id: string;

  @Column('float')
  rating: number;

  @Column()
  director: string;

  @Column('simple-array')
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

  @Column('simple-json')
  schedule: ScheduleSession[];
}
