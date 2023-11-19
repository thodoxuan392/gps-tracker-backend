import { MongoDBClientModule } from 'infra/mongodb-client/mongodb-client.module';
import { DEVICE_REPOSITORY } from './device-repository.interface';
import { DeviceRepositoryService } from './device-repository.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongoDBClientModule],
  providers: [
    {
      provide: DEVICE_REPOSITORY,
      useClass: DeviceRepositoryService,
    },
  ],
  exports: [DEVICE_REPOSITORY],
})
export class DeviceRepositoryModule {}
