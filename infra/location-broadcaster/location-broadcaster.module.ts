import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LOCATION_BROADCASTER } from './location-broadcaster.interface';
import { LocationBroadcastService } from './location-broadcaster.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: LOCATION_BROADCASTER,
      useClass: LocationBroadcastService,
    },
  ],
  exports: [LOCATION_BROADCASTER],
})
export class LocationBroadcasterModule {}
