import { ConfigModule } from '@nestjs/config';
import { DeviceRepositoryModule } from 'src/module/repository/device/device-repository.module';
import { Es353Service } from './es353.service';
import { ES353_SERVER_PORT } from './adapter/es353-server/es353-server.interface';
import { Es353Server } from './adapter/es353-server/es353-server.service';
import { Module } from '@nestjs/common';
import { DeviceStatusRepositoryModule } from 'src/module/repository/device-status/device-status-repository.module';
import { LocationRepositoryModule } from 'src/module/repository/location/location-repository.module';
import { LocationBroadcasterModule } from 'infra/location-broadcaster/location-broadcaster.module';

@Module({
  imports: [
    ConfigModule,
    DeviceRepositoryModule,
    DeviceStatusRepositoryModule,
    LocationRepositoryModule,
    LocationBroadcasterModule,
  ],
  providers: [
    Es353Service,
    {
      provide: ES353_SERVER_PORT,
      useClass: Es353Server,
    },
  ],
  exports: [Es353Service, ES353_SERVER_PORT],
})
export class Es353module {}
