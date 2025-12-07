import { Global, Module } from '@nestjs/common';
import FilmsRepository from './films.repository';

@Global()
@Module({
  providers: [FilmsRepository],
  exports: [FilmsRepository],
})
export class RepositoryModule {}
