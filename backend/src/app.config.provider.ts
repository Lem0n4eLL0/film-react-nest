import { ConfigModule } from '@nestjs/config';

const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    port: +process.env.PORT || 3000,
    database: {
      driver: process.env.DATABASE_DRIVER || 'mongodb',
      url:
        process.env.DATABASE_URL || 'mongodb://localhost:27017/film-react-nest',
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
  port: number;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

export default configProvider;
