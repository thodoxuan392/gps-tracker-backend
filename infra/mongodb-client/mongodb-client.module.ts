import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MONGO_DB_CLIENT } from './mongodb-client.interface';
import { MongoDBClient } from './mongodb-client.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MONGO_DB_CLIENT,
      useClass: MongoDBClient,
    },
  ],
  exports: [MONGO_DB_CLIENT],
})
export class MongoDBClientModule {}
