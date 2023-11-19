import { Constant } from 'src/module/shared';
import { PacketBase } from 'src/module/shared/types';

export class Ygt92Builder {
  static buildResponse(response: PacketBase<any>): Buffer {
    let buffer: Buffer;
    let bufferLength = 0;
    buffer[bufferLength++] = Constant.DataPacket.START_BIT[0];
    buffer[bufferLength++] = Constant.DataPacket.START_BIT[1];
    buffer[bufferLength++] = response.packetLength;
    buffer[bufferLength++] = response.protocolNumber;
    buffer[bufferLength++] = response.serialNumber[0];
    buffer[bufferLength++] = response.serialNumber[1];
    buffer[bufferLength++] = Constant.DataPacket.STOP_BIT[0];
    buffer[bufferLength++] = Constant.DataPacket.STOP_BIT[1];
    return buffer;
  }
}
