import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MQTTClient, MQTTConnectOption } from 'infra/mqtt-client/mqtt-client';
import {
  Location,
  LocationBroadcasterPort,
} from './location-broadcaster.interface';
import { DeviceModel } from 'src/module/repository/device/device-repository.interface';

@Injectable()
export class LocationBroadcastService implements LocationBroadcasterPort {
  private _logger = new Logger(LocationBroadcastService.name);
  private _mqttClient = new MQTTClient();
  private _mqttConnectOptions: MQTTConnectOption;
  constructor(@Inject(ConfigService) private _configServer: ConfigService) {
    this._mqttConnectOptions = {
      host: this._configServer.get('broadcaster').host,
      port: this._configServer.get('broadcaster').port,
      clientId: this._configServer.get('broadcaster').clientId,
      username: this._configServer.get('broadcaster').username,
      password: this._configServer.get('broadcaster').password,
      protocol: 'mqtt',
    };
    this._mqttClient.init(this._mqttConnectOptions);
  }

  publish(device: DeviceModel, location: Location) {
    const { deviceId, deviceModel } = device;
    const topic = this._buildLocationBroadcasterTopic(deviceId, deviceModel);
    const payload = JSON.stringify(location);
    this._mqttClient.publish(topic, payload);
  }

  private _buildLocationBroadcasterTopic(
    deviceId: string,
    model: string,
  ): string {
    return `dt/${model}/${deviceId}/location`;
  }
}
