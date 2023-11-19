import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Net from 'net';
import { Observable, Subject } from 'rxjs';
import { Ygt92Data, Ygt92ServerPort } from './ygt92-server.interface';

@Injectable()
export class Ygt92Server implements Ygt92ServerPort {
  private _logger = new Logger(Ygt92Server.name);
  private _tcpServer: Net.Server;
  private _port: number;
  private _dataSubject = new Subject<Ygt92Data>();
  constructor(@Inject(ConfigService) private _configService: ConfigService) {
    this._tcpServer = Net.createServer();
    this._port = this._configService.get('ygt92').port;
    this.start();
  }
  start(): void {
    this._tcpServer.on('connection', (connection) => {
      this._logger.log(
        `Connection from ${JSON.stringify(
          connection.address(),
        )}  established successfully`,
      );
      connection.on('data', this._handleConnectionData.bind(this, 1));
      connection.on('error', this._handleConnectionError.bind(this, 1));
      connection.on('close', this._handleConnectionClose.bind(this, 1));
      connection.on('timeout', () => {
        this._logger.error('Connection timed out');
      });
      connection.on('ready', () => {
        this._logger.log('Connection is already connected');
      });
    });
    this._tcpServer.listen(this._port, () => {
      const address = this._tcpServer.address() as Net.AddressInfo;
      this._logger.log(`TCP server listening on port ${address.port}`);
    });
  }

  getDataObservable(): Observable<Ygt92Data> {
    return this._dataSubject.pipe();
  }

  sendData(tcpData: Ygt92Data): void {
    const { data, connection } = tcpData;
    connection.write(data);
  }
  private _handleConnectionData(connection: Net.Socket, data: Buffer) {
    this._dataSubject.next({
      connection,
      data,
    });
  }
  private _handleConnectionError(connection: Net.Socket, error: any) {
    this._logger.error(`Connection error: ${JSON.stringify(error)}`);
  }
  private _handleConnectionClose(connection: Net.Socket, hadError: boolean) {
    if (hadError) {
      this._logger.error(`Connection closed unexpectedly`);
    } else {
      this._logger.log(`Connection closed successfully`);
    }
  }
}
