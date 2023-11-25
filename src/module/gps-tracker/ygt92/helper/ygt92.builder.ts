import { YGT92 } from 'src/module/shared';

export class Ygt92Builder {
  static buildResponse(response: YGT92.Types.PacketBase<any>): Buffer {
    let buffer: Buffer;
    let bufferLength = 0;
    buffer[bufferLength++] = YGT92.Constant.DataPacket.START_BIT[0];
    buffer[bufferLength++] = YGT92.Constant.DataPacket.START_BIT[1];
    buffer[bufferLength++] = response.packetLength;
    buffer[bufferLength++] = response.protocolNumber;
    buffer[bufferLength++] = response.serialNumber[0];
    buffer[bufferLength++] = response.serialNumber[1];
    buffer[bufferLength++] = YGT92.Constant.DataPacket.STOP_BIT[0];
    buffer[bufferLength++] = YGT92.Constant.DataPacket.STOP_BIT[1];
    return buffer;
  }
}
