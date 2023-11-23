import { ConfigModule } from "@nestjs/config";
import { DeviceRepositoryModule } from "src/module/repository/device/device-repository.module";
import { HeartbeatRepositoryModule } from "src/module/repository/heartbeat/heartbeat-repository.module";
import { LocationRepositoryModule } from "src/module/repository/location/location-repository.module";
import { LoginRepositoryModule } from "src/module/repository/device-status/device-status-repository.module";
import { Ygt92Service } from "./ygt92.service";
import {  YGT92_SERVER_PORT } from "./adapter/ygt92-server/ygt92-server.interface";
import { Ygt92Server } from "./adapter/ygt92-server/ygt92-server.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [
      ConfigModule,
      DeviceRepositoryModule,
      HeartbeatRepositoryModule,
      LocationRepositoryModule,
      LoginRepositoryModule,
    ],
    providers: [
      Ygt92Service,
      {
        provide: YGT92_SERVER_PORT,
        useClass: Ygt92Server,
      },
    ],
    exports: [Ygt92Service, YGT92_SERVER_PORT],
  })
  export class Ygt92Module {}