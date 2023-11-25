import { YGT92 } from 'src/module/shared';

export class Ygt92Parser {
  static parseTcpData<T>(data: Buffer): YGT92.Types.PacketBase<T> {
    // Check start byte
    const startBit = [data[0], data[1]];
    if (
      !YGT92.Utils.compareArray(startBit, YGT92.Constant.DataPacket.START_BIT)
    ) {
      console.error(`Invalid start bit [${startBit}]`);
      return;
    }
    // Check stop bit
    const stopBit = [data[data.length - 2], data[data.length - 1]];
    if (
      !YGT92.Utils.compareArray(stopBit, YGT92.Constant.DataPacket.STOP_BIT)
    ) {
      console.error(`Invalid stop bit [${stopBit}]`);
      return;
    }
    // Check packet length
    const packetLength = data[2];
    const calculatePacketLength = data.length - 4;
    if (packetLength != calculatePacketLength) {
      console.error(
        `Packet length ${calculatePacketLength} is not valid, expect ${packetLength}`,
      );
      return;
    }
    // Protocol check
    const protocolNumber = data[3];
    const protocolList = Object.values(
      YGT92.Constant.DataPacket.ProtocolNumber,
    );
    if (!protocolList.includes(protocolNumber)) {
      console.error(`Protocol number ${protocolNumber} is not valid`);
      return;
    }
    // Serial number
    const serialNumber = [data[data.length - 6], data[data.length - 5]];
    // Error Check
    const errorCheck = [data[data.length - 4], data[data.length - 3]];
    const dataToCheck = data.subarray(2, data.length - 5);
    const crc = (data[data.length - 4] << 8) | data[data.length - 3];
    const crcCalculated = YGT92.Utils.crcCalculate(dataToCheck);
    if (crcCalculated !== crc) {
      console.error(
        `Data array ${dataToCheck} have crc ${crcCalculated}, expect ${crc}`,
      );
      return;
    }
    const informationContent = data.subarray(4, data.length - 7);
    let content;
    switch (protocolNumber) {
      case YGT92.Constant.DataPacket.ProtocolNumber.LOGIN_MESSAGE:
        content = this.parseLoginMessage(informationContent);
        break;
      case YGT92.Constant.DataPacket.ProtocolNumber.LOCATION_DATA:
        content = this.parseLocationData(informationContent);
        break;
      case YGT92.Constant.DataPacket.ProtocolNumber.STATUS_INFORMATION:
        content = this.parseHeartBeat(informationContent);
        break;
      default:
        break;
    }
    return {
      startBit,
      packetLength,
      protocolNumber,
      informationContent: content,
      serialNumber,
      errorCheck,
      stopBit,
    };
  }
  static parseLoginMessage(
    informationContent: Buffer,
  ): YGT92.Types.LoginContent {
    return {
      terminalId: Array.from(informationContent, (byte: number) => byte),
    };
  }
  static parseLocationData(
    informationContent: Buffer,
  ): YGT92.Types.LocationContent {
    return {
      gpsInformation: {
        dataTime: Array.from(
          informationContent.subarray(0, 5),
          (byte: number) => byte,
        ),
        quantityOfInformation: informationContent[6],
        latitude: Array.from(
          informationContent.subarray(7, 10),
          (byte: number) => byte,
        ),
        longitude: Array.from(
          informationContent.subarray(11, 14),
          (byte: number) => byte,
        ),
        speed: informationContent[15],
        courseStatus: Array.from(
          informationContent.subarray(16, 17),
          (byte: number) => byte,
        ),
      },
      lbsInformation: {
        mcc: Array.from(
          informationContent.subarray(18, 19),
          (byte: number) => byte,
        ),
        mnc: informationContent[20],
        lac: Array.from(
          informationContent.subarray(21, 22),
          (byte: number) => byte,
        ),
        cellId: Array.from(
          informationContent.subarray(23, 25),
          (byte: number) => byte,
        ),
      },
    };
  }
  static parseHeartBeat(
    informationContent: Buffer,
  ): YGT92.Types.HeartBeatContent {
    return {
      statusInformation: {
        terminalInformation: informationContent[0],
        voltageLevel: informationContent[1],
        gsmSignalStrength: informationContent[2],
        alarmLanguage: informationContent[3],
      },
    };
  }
}
