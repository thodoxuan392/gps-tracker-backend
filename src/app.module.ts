import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { GpsTrackerModule } from './module/gps-tracker/gps-tracker.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    GpsTrackerModule,
  ],
})
export class AppModule {}
