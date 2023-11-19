import { Observable } from 'rxjs';
import * as Net from 'net';

export const TCP_SERVER_PORT = Symbol('TcpServerPort');

export type TcpData = {
  connection: Net.Socket;
  data: Buffer;
};

export interface TcpServerPort {
  getDataObservable(): Observable<TcpData>;
  sendData(tcpData: TcpData): void;
}
