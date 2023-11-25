import { Inject, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  Connection,
  ES353_SERVER_PORT,
  Es353Data,
  Es353ServerPort,
} from './adapter/es353-server/es353-server.interface';
import {
  DEVICE_REPOSITORY,
  DeviceRepositoryPort,
} from 'src/module/repository/device/device-repository.interface';
import { Es353Parser } from './helper/es353.parser';
import * as Net from 'net';
import {
  DEVICE_STATUS_REPOSITORY,
  DeviceStatusRepositoryPort,
} from 'src/module/repository/device-status/device-status-repository.interface';
import { Es353DeviceModel } from 'src/module/repository/device/es353/es353-device.interface';
import { Es353DeviceStatusModel } from 'src/module/repository/device-status/es353/es353-device-status.interface';
import { ES353 } from 'src/module/shared';
import {
  LOCATION_REPOSITORY,
  LocationModel,
  LocationRepositoryPort,
} from 'src/module/repository/location/location-repository.interface';
import { Es353Builder } from './helper/es353.builder';

@Injectable()
export class Es353Service {
  private _logger = new Logger(Es353Service.name);
  private _tcpDataObservable: Observable<Es353Data>;
  private _connection: Record<string, Connection> = {};
  private _connectionTimer: Record<string, NodeJS.Timeout> = {};
  private CONNECTION_TIMEOUT = 60 * 1000;
  private HANDLE_MAPPING = {
    [ES353.Enum.FeedbackId.GENERAL]: this.handleFeedbackGeneral.bind(this),
    [ES353.Enum.FeedbackId.CONFIRM]: this.handleFeedbackConfirm.bind(this),
  };
  constructor(
    @Inject(ES353_SERVER_PORT) private _es353Server: Es353ServerPort,
    @Inject(DEVICE_REPOSITORY) private _deviceRepo: DeviceRepositoryPort,
    @Inject(DEVICE_STATUS_REPOSITORY)
    private _deviceStatusRepo: DeviceStatusRepositoryPort,
    @Inject(LOCATION_REPOSITORY) private _locationRepo: LocationRepositoryPort,
  ) {
    this._start();
  }
  public handleCommand(command: ES353.Types.Command) {
    Object.keys(this._connection).forEach((key) => {
      this._connection[key].write(Es353Builder.buildCommand(command));
    });
    const { vehicleId: deviceId } = command;
    const connection = this._getConnectionByDeviceId(deviceId);
    if (!connection) {
      this._logger.error(`Couldn't find connection with id ${deviceId}`);
      return;
    }
    connection.write(Es353Builder.buildCommand(command));
  }

  public async handleFeedbackGeneral(message: ES353.Types.FeedbackGeneral) {
    const { vehicleId: deviceId, manufacturerName, vehicleId } = message;
    this._emitActivity(deviceId);
    let device = await this._deviceRepo.findById(deviceId);
    if (!device) {
      device = await this._createNewDevice({
        deviceId: vehicleId,
        serialNumber: vehicleId,
        metaData: {
          manufacturerName,
        },
      });
    }
    // Update device status
    const { vehicleStatus } = message;
    let deviceStatus = await this._deviceStatusRepo.findByDeviceId(deviceId);
    if (!deviceStatus) {
      deviceStatus = await this._createNewDeviceStatus({
        deviceId,
        isOnline: true,
        metaData: {
          vehicleStatus,
        },
      });
    }
    await this._deviceStatusRepo.update({
      deviceId,
      isOnline: true,
      metaData: {
        vehicleStatus,
      },
    });

    // Create new location
    const { latitude, latitudeSign, longitude, longitudeSign, speed } = message;
    await this._createNewLocation({
      deviceId,
      latitude: ES353.Utils.cvtLatLongToStd(latitude),
      latitudeDirection: ES353.Utils.cvtLatSignToDirection(latitudeSign),
      longitude: ES353.Utils.cvtLatLongToStd(longitude),
      longitudeDirection: ES353.Utils.cvtLongSignToDirection(longitudeSign),
      speed,
    });
  }

  public async handleFeedbackConfirm(message: ES353.Types.FeedbackConfirm) {
    const { vehicleId: deviceId, manufacturerName, vehicleId } = message;
    this._emitActivity(deviceId);
    this._logger.log(`This is feedback confirm message`);
  }

  private _start() {
    this._tcpDataObservable = this._es353Server.getDataObservable();
    this._tcpDataObservable.subscribe({
      next: async (data) => {
        await this._handleTcpServerData(data);
      },
      error: (err) => {
        this._logger.error(err);
      },
    });
  }

  private async _handleTcpServerData(tcpData: Es353Data) {
    const { connection, data: rawData } = tcpData;
    // Parse raw data from tracker
    const stringData = rawData.toString();
    const trunkedData = stringData.substring(0, stringData.length - 1);
    const response = Es353Parser.parseResponse(trunkedData);
    this._logger.log(JSON.stringify(response));
    if (!response) {
      this._logger.error(`Could not parse tcp data: ${rawData}`);
      return;
    }
    // Save connection information
    const { vehicleId: deviceId, id } = response;
    this._connection[deviceId] = connection;
    // Handle data
    this.HANDLE_MAPPING[id](response);
  }

  private _getConnectionByDeviceId(id: string): Connection {
    return this._connection[id];
  }

  private async _createNewDevice(
    params: Partial<Es353DeviceModel>,
  ): Promise<Es353DeviceModel> {
    const { deviceId, name, serialNumber, metaData } = params;
    const model: Es353DeviceModel = {
      deviceId,
      name: name || deviceId,
      serialNumber: serialNumber || deviceId,
      metaData: metaData,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    this._logger.log(JSON.stringify(model));
    await this._deviceRepo.create(model);
    return model;
  }
  private async _createNewDeviceStatus(
    params: Partial<Es353DeviceStatusModel>,
  ): Promise<Es353DeviceStatusModel> {
    const { deviceId, isOnline, metaData } = params;
    const model: Es353DeviceStatusModel = {
      deviceId,
      isOnline,
      metaData,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    await this._deviceStatusRepo.create(model);
    return model;
  }

  private async _createNewLocation(
    params: Partial<LocationModel>,
  ): Promise<LocationModel> {
    const {
      deviceId,
      latitude,
      latitudeDirection,
      longitude,
      longitudeDirection,
      speed,
    } = params;
    const model: LocationModel = {
      deviceId,
      latitude,
      latitudeDirection,
      longitude,
      longitudeDirection,
      speed,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    this._logger.log(JSON.stringify(model));
    await this._locationRepo.create(model);
    return model;
  }

  private _emitActivity(deviceId: string) {
    if (!this._connectionTimer[deviceId]) {
      clearTimeout(this._connectionTimer[deviceId]);
      delete this._connectionTimer[deviceId];
    }
    this._startConnectionTimer(deviceId);
  }

  private _startConnectionTimer(deviceId: string) {
    this._connectionTimer[deviceId] = setTimeout(async () => {
      const deviceStatus = await this._deviceStatusRepo.findByDeviceId(
        deviceId,
      );
      if (!deviceStatus) {
        return;
      }
      await this._deviceStatusRepo.update({
        ...deviceStatus,
        isOnline: false,
      });
    }, this.CONNECTION_TIMEOUT);
  }
}
