import { Logger } from '@nestjs/common';
import * as MQTTPattern from 'mqtt-pattern';
import * as mqtt from 'mqtt';
import { Subject, filter, firstValueFrom } from 'rxjs';

export type MQTTConnectOption = mqtt.IClientOptions;

export type MQTTSubscribeOption = mqtt.IClientSubscribeOptions;

export type MQTTPublishOption = mqtt.IClientPublishOptions;

export type MQTTConnectionStatus =
  | 'connected'
  | 'disconnected'
  | 'reconnect'
  | 'error';

const DEFAULT_SUBSCRIBE_OPTION: MQTTSubscribeOption = {
  qos: 1,
  rap: false,
};

const DEFAULT_PUBLISH_OPTION: MQTTPublishOption = {
  qos: 1,
  retain: false,
};

export class MQTTClient {
  private _logger = new Logger(MQTTClient.name);
  private _client: mqtt.MqttClient;
  private _subscribe$ = new Subject<{ topic: string; payload: string }>();
  private _status$ = new Subject<MQTTConnectionStatus>();

  async init(option: MQTTConnectOption): Promise<void> {
    this._client = mqtt.connect(option);
    this._client.on('connect', () => {
      this._logger.log('MQTT connected');
      this._status$.next('connected');
    });
    this._client.on('disconnect', () => {
      this._logger.log('MQTT disconnected');
      this._status$.next('disconnected');
      this._client.reconnect();
    });
    this._client.on('reconnect', () => {
      this._logger.log('MQTT is reconnecting');
      this._status$.next('reconnect');
    });
    this._client.on('error', () => {
      this._logger.log('MQTT error');
      this._status$.next('error');
    });
    this._client.on('message', (topic, payload_buffer) => {
      const payload = payload_buffer.toString();
      this._subscribe$.next({ topic, payload });
    });
    await firstValueFrom(
      this._status$.pipe(filter((status) => status === 'connected')),
    );
  }

  subscribe(
    topic: string,
    handler: (topic, payload) => void,
    option?: MQTTSubscribeOption,
  ): void {
    const subscribeOption: MQTTSubscribeOption = {
      ...DEFAULT_SUBSCRIBE_OPTION,
      ...option,
    };
    this._client.subscribe(topic, subscribeOption, (err, granted) => {
      granted.map(({ topic, qos }) => {
        this._logger.log(`Subscribed topic ${topic}, qos ${qos}`);
      });
    });
    this._subscribe$
      .pipe(filter(({ topic: _topic }) => this._isMatchTopic(topic, _topic)))
      .subscribe({
        next: ({ topic, payload }) => {
          this._logger.log(
            `[SUBSCRIBE] Receive message from topic ${topic} with payload ${payload}`,
          );
          try {
            handler(topic, JSON.parse(payload));
          } catch (err) {
            this._logger.error(
              `Cannot execute handler topic ${topic} with payload ${payload}`,
            );
            this._logger.error(err.message, err.stack);
          }
        },
      });
  }

  unsubscribe(topic): void {
    this._client.unsubscribe(topic);
  }

  publish(topic: string, payload: string, option?: MQTTPublishOption): void {
    const publishOption: MQTTPublishOption = {
      ...DEFAULT_PUBLISH_OPTION,
      ...option,
    };

    this._client.publish(topic, payload, publishOption, (err) => {
      if (!err) {
        this._logger.log(
          `[PUBLISH] topic ${topic}, payload ${payload} successful`,
        );
      } else {
        this._logger.error(
          `[PUBLISH] topic ${topic}, payload ${payload} failed`,
        );
      }
    });
  }

  destroy(): void {
    this._client.end();
  }

  private _isMatchTopic(topic: string, realTopic: string): boolean {
    return MQTTPattern.matches(topic, realTopic);
  }
}
