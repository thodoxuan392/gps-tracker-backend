import { Module } from '@nestjs/common';
import { MongoDBClientModule } from 'infra/mongodb-client/mongodb-client.module';
import { LOCATION_REPOSITORY } from './location-repository.interface';
import { LocationRepositoryService } from './location-repository.service';

@Module({
  imports: [MongoDBClientModule],
  providers: [
    {
      provide: LOCATION_REPOSITORY,
      useClass: LocationRepositoryService,
    },
  ],
  exports: [LOCATION_REPOSITORY],
})
export class LocationRepositoryModule {}
