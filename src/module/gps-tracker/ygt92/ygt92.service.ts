import { Inject, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Ygt92Parser } from './helper/ygt92.parser';
import { HeartBeat, Location, Login } from './shared/types';
import { Ygt92Builder } from './helper/ygt92.builder';
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
import { YGT92_SERVER_PORT, Ygt92Data, Ygt92ServerPort } from './adapter/ygt92-server/ygt92-server.interface';

@Injectable()
export class Ygt92Service {
  private _logger = new Logger(Ygt92Service.name);
  private _tcpDataObservable: Observable<Ygt92Data>;
  private HANDLE_MAPPING = {
    [Constant.DataPacket.ProtocolNumber.LOGIN_MESSAGE]:
      this._handleLoginMessage.bind(this, 1),
    [Constant.DataPacket.ProtocolNumber.LOCATION_DATA]:
      this._handleLocationData.bind(this, 1),
    [Constant.DataPacket.ProtocolNumber.STATUS_INFORMATION]:
      this._handleHeartbeat.bind(this, 1),
  };
  constructor(
    @Inject(YGT92_SERVER_PORT) private _ygt92Server: Ygt92ServerPort,
    @Inject(DEVICE_REPOSITORY) private _deviceRepo: DeviceRepositoryPort,
    @Inject(HEARTBEAT_REPOSITORY)
    private _heartbeatRepo: HeartbeatRepositoryPort,
    @Inject(LOCATION_REPOSITORY) private _locationRepo: LocationRepositoryPort,
    @Inject(LOGIN_REPOSITORY) private _loginRepo: LoginRepositoryPort,
  ) {
    this._start();
  }

  private _start() {
    this._tcpDataObservable = this._ygt92Server.getDataObservable();
    this._tcpDataObservable.subscribe({
      next: (data) => {
        this._handleTcpServerData(data);
      },
      error: (err) => {
        this._logger.error(err);
      },
    });
  }

  private _handleTcpServerData(tcpData: Ygt92Data) {
    const { connection, data: rawData } = tcpData;
    // Parse raw data from tracker
    const parsedData = Ygt92Parser.parseTcpData(rawData);
    if (!parsedData) {
      this._logger.error(`Could not parse tcp data: ${rawData}`);
      return;
    }
    // Send response to tracker
    const response = Ygt92Builder.buildResponse(parsedData);
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
