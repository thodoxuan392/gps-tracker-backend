import { Inject, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Ygt92Parser } from './helper/ygt92.parser';
import { Ygt92Builder } from './helper/ygt92.builder';
import {
  DEVICE_REPOSITORY,
  DeviceRepositoryPort,
} from '../../repository/device/device-repository.interface';
import {
  DEVICE_STATUS_REPOSITORY,
  DeviceStatusRepositoryPort,
} from '../../repository/device-status/device-status-repository.interface';
import {
  YGT92_SERVER_PORT,
  Ygt92Data,
  Ygt92ServerPort,
} from './adapter/ygt92-server/ygt92-server.interface';
import { YGT92 } from 'src/module/shared';

@Injectable()
export class Ygt92Service {
  private _logger = new Logger(Ygt92Service.name);
  private _tcpDataObservable: Observable<Ygt92Data>;
  private HANDLE_MAPPING = {
    [YGT92.Constant.DataPacket.ProtocolNumber.LOGIN_MESSAGE]:
      this._handleLoginMessage.bind(this, 1),
    [YGT92.Constant.DataPacket.ProtocolNumber.LOCATION_DATA]:
      this._handleLocationData.bind(this, 1),
    [YGT92.Constant.DataPacket.ProtocolNumber.STATUS_INFORMATION]:
      this._handleHeartbeat.bind(this, 1),
  };
  constructor(
    @Inject(YGT92_SERVER_PORT) private _ygt92Server: Ygt92ServerPort,
    @Inject(DEVICE_REPOSITORY) private _deviceRepo: DeviceRepositoryPort,
    @Inject(DEVICE_STATUS_REPOSITORY)
    private _deviceStatus: DeviceStatusRepositoryPort,
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

  private _handleLoginMessage(loginMessage: YGT92.Types.Login) {
    this._logger.log(`This is login message`);
  }

  private _handleLocationData(location: YGT92.Types.Location) {
    this._logger.log(`This is location message`);
  }

  private _handleHeartbeat(heartbeat: YGT92.Types.HeartBeat) {
    this._logger.log(`This is heartbeat message`);
  }
}
