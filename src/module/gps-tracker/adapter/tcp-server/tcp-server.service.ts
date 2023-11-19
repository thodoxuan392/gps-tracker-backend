import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Net from 'net';
import { TcpData, TcpServerPort } from './tcp-server.interface';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TcpServer implements TcpServerPort {
  private _logger = new Logger(TcpServer.name);
  private _tcpServer: Net.Server;
  private _port: number;
  private _dataSubject = new Subject<TcpData>();
  constructor(@Inject(ConfigService) private _configService: ConfigService) {
    this._tcpServer = Net.createServer();
    this._port = this._configService.get('gspTrackerPort');
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

  getDataObservable(): Observable<TcpData> {
    return this._dataSubject.pipe();
  }

  sendData(tcpData: TcpData): void {
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
      this._logger.error(`Connection closed successfully`);
    }
  }
}
