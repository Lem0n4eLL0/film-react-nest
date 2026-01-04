import { ConfigModule } from '@nestjs/config';

const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    port: +process.env.PORT || 3000,
    database: {
      driver: (process.env.DATABASE_DRIVER as Driver) || 'mongodb',
      url:
        process.env.DATABASE_URL || 'mongodb://localhost:27017/film-react-nest',
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
  },
};

export type Driver = 'mongodb' | 'postgres';
export interface AppConfig {
  database: AppConfigDatabase;
  port: number;
}

export interface AppConfigDatabase {
  driver: Driver;
  url: string;
  username?: string;
  password?: string;
}

export default configProvider;
