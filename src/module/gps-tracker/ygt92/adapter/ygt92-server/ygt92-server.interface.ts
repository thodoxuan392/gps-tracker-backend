import { Observable } from 'rxjs';
import * as Net from 'net';

export const YGT92_SERVER_PORT = Symbol('Ygt92ServerPort');

export type Ygt92Data = {
  connection: Net.Socket;
  data: Buffer;
};

export interface Ygt92ServerPort {
  getDataObservable(): Observable<Ygt92Data>;
  sendData(tcpData: Ygt92Data): void;
}
