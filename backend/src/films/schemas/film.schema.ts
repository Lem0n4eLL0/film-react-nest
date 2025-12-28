import { Schema } from 'mongoose';
import { FILMS_TAGS } from '../entity/films.entity';
import ScheduleSessionSchema from './scheduleSession.schema';

export const FilmSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      enum: FILMS_TAGS,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    schedule: {
      type: [ScheduleSessionSchema],
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
  },
);

export default FilmSchema;
