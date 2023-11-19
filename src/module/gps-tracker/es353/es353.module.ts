import { ConfigModule } from "@nestjs/config";
import { DeviceRepositoryModule } from "src/module/repository/device/device-repository.module";
import { HeartbeatRepositoryModule } from "src/module/repository/heartbeat/heartbeat-repository.module";
import { LocationRepositoryModule } from "src/module/repository/location/location-repository.module";
import { LoginRepositoryModule } from "src/module/repository/login/login-repository.module";
import { Es353Service } from "./es353.service";
import { ES353_SERVER_PORT } from "./adapter/es353-server/es353-server.interface";
import { Es353Server } from "./adapter/es353-server/es353-server.service";
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
      Es353Service,
      {
        provide: ES353_SERVER_PORT,
        useClass: Es353Server,
      },
    ],
    exports: [Es353Service, ES353_SERVER_PORT],
  })
  export class Es353module {}