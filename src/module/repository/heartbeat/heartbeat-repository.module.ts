import { Module } from '@nestjs/common';
import { MongoDBClientModule } from 'infra/mongodb-client/mongodb-client.module';
import { HEARTBEAT_REPOSITORY } from './heartbeat-repository.interface';
import { HeartbeatRepositoryService } from './heartbeat-repository.service';

@Module({
  imports: [MongoDBClientModule],
  providers: [
    {
      provide: HEARTBEAT_REPOSITORY,
      useClass: HeartbeatRepositoryService,
    },
  ],
  exports: [HEARTBEAT_REPOSITORY],
})
export class HeartbeatRepositoryModule {}
