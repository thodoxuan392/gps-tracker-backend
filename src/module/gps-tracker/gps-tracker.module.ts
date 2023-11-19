import { Module } from '@nestjs/common';
import { GpsTrackerService } from './gps-tracker.service';
import { ConfigModule } from '@nestjs/config';
import { TcpServer } from './adapter/tcp-server/tcp-server.service';
import { TCP_SERVER_PORT } from './adapter/tcp-server/tcp-server.interface';
import { DeviceRepositoryModule } from '../repository/device/device-repository.module';
import { HeartbeatRepositoryModule } from '../repository/heartbeat/heartbeat-repository.module';
import { LocationRepositoryModule } from '../repository/location/location-repository.module';
import { LoginRepositoryModule } from '../repository/login/login-repository.module';

@Module({
  imports: [
    ConfigModule,
    DeviceRepositoryModule,
    HeartbeatRepositoryModule,
    LocationRepositoryModule,
    LoginRepositoryModule,
  ],
  providers: [
    GpsTrackerService,
    {
      provide: TCP_SERVER_PORT,
      useClass: TcpServer,
    },
  ],
  exports: [GpsTrackerService, TCP_SERVER_PORT],
})
export class GpsTrackerModule {}
