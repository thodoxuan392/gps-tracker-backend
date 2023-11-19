import { Inject, Injectable, Logger } from '@nestjs/common';
import { ES353_SERVER_PORT, Es353Data, Es353ServerPort } from './adapter/es353-server/es353-server.interface';
import { Observable } from 'rxjs';
import { GspTrackerParser } from './helper/es353.parser';
import { GspTrackerBuilder } from './helper/es353.builder';
import { Constant } from './shared';
import {
  DEVICE_REPOSITORY,
  DeviceRepositoryPort,
} from '../../repository/device/device-repository.interface';
import {
  HEARTBEAT_REPOSITORY,
  HeartbeatRepositoryPort,
} from '../../repository/heartbeat/heartbeat-repository.interface';
import {
  LOCATION_REPOSITORY,
  LocationRepositoryPort,
} from '../../repository/location/location-repository.interface';
import {
  LOGIN_REPOSITORY,
  LoginRepositoryPort,
} from '../../repository/login/login-repository.interface';

@Injectable()
export class Es353Service {
  private _logger = new Logger(Es353Service.name);
  private _tcpDataObservable: Observable<Es353Data>;
  
}
