import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  TCP_SERVER_PORT,
  TcpData,
  TcpServerPort,
} from './adapter/tcp-server/tcp-server.interface';
import { Observable } from 'rxjs';
import { GspTrackerParser } from './helper/gps-tracker.parser';
import { HeartBeat, Location, Login } from '../shared/types';
import { GspTrackerBuilder } from './helper/gps-tracker.builder';
import { Constant } from '../shared';
import {
  DEVICE_REPOSITORY,
  DeviceRepositoryPort,
} from '../repository/device/device-repository.interface';
import {
  HEARTBEAT_REPOSITORY,
  HeartbeatRepositoryPort,
} from '../repository/heartbeat/heartbeat-repository.interface';
import {
  LOCATION_REPOSITORY,
  LocationRepositoryPort,
} from '../repository/location/location-repository.interface';
import {
  LOGIN_REPOSITORY,
  LoginRepositoryPort,
} from '../repository/login/login-repository.interface';

@Injectable()
export class GpsTrackerService {
  private _logger = new Logger(GpsTrackerService.name);
  private _tcpDataObservable: Observable<TcpData>;
  private HANDLE_MAPPING = {
    [Constant.DataPacket.ProtocolNumber.LOGIN_MESSAGE]:
      this._handleLoginMessage.bind(this, 1),
    [Constant.DataPacket.ProtocolNumber.LOCATION_DATA]:
      this._handleLocationData.bind(this, 1),
    [Constant.DataPacket.ProtocolNumber.STATUS_INFORMATION]:
      this._handleHeartbeat.bind(this, 1),
  };
  constructor(
    @Inject(TCP_SERVER_PORT) private _tcpServer: TcpServerPort,
    @Inject(DEVICE_REPOSITORY) private _deviceRepo: DeviceRepositoryPort,
    @Inject(HEARTBEAT_REPOSITORY)
    private _heartbeatRepo: HeartbeatRepositoryPort,
    @Inject(LOCATION_REPOSITORY) private _locationRepo: LocationRepositoryPort,
    @Inject(LOGIN_REPOSITORY) private _loginRepo: LoginRepositoryPort,
  ) {
    this._start();
  }

  private _start() {
    this._tcpDataObservable = this._tcpServer.getDataObservable();
    this._tcpDataObservable.subscribe({
      next: (data) => {
        this._handleTcpServerData(data);
      },
      error: (err) => {
        this._logger.error(err);
      },
    });
  }

  private _handleTcpServerData(tcpData: TcpData) {
    const { connection, data: rawData } = tcpData;
    // Parse raw data from tracker
    const parsedData = GspTrackerParser.parseTcpData(rawData);
    if (!parsedData) {
      this._logger.error(`Could not parse tcp data: ${rawData}`);
      return;
    }
    // Send response to tracker
    const response = GspTrackerBuilder.buildResponse(parsedData);
    connection.write(response);
    // Handle data
    this.HANDLE_MAPPING[parsedData.protocolNumber](parsedData);
  }

  private _handleLoginMessage(loginMessage: Login) {
    this._logger.log(`This is login message`);
  }

  private _handleLocationData(location: Location) {
    this._logger.log(`This is location message`);
  }

  private _handleHeartbeat(heartbeat: HeartBeat) {
    this._logger.log(`This is heartbeat message`);
  }
}
