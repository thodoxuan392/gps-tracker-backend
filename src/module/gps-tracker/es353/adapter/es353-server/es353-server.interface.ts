import { Observable } from 'rxjs';
import * as Net from 'net';

export const ES353_SERVER_PORT = Symbol('Es353ServerPort');

export type Es353Data = {
  connection: Connection;
  data: Buffer;
};

export type Connection = Net.Socket;

export type ConnectionStatus = 'connected' | 'error' | 'closed';
export interface Es353ServerPort {
  getDataObservable(): Observable<Es353Data>;
  sendData(tcpData: Es353Data): void;
}
