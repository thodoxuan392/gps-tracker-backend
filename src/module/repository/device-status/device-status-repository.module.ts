import { Module } from '@nestjs/common';
import { MongoDBClientModule } from 'infra/mongodb-client/mongodb-client.module';
import { DEVICE_STATUS_REPOSITORY } from './device-status-repository.interface';
import { DeviceStatusRepository } from './device-status-repository.service';

@Module({
  imports: [MongoDBClientModule],
  providers: [
    {
      provide: DEVICE_STATUS_REPOSITORY,
      useClass: DeviceStatusRepository,
    },
  ],
  exports: [DEVICE_STATUS_REPOSITORY],
})
export class DeviceStatusRepositoryModule {}
