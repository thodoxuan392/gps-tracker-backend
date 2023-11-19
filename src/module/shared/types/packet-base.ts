export type PacketBase<T = any> = {
  startBit: number[];
  packetLength: number;
  protocolNumber: number;
  informationContent?: T;
  serialNumber: number[];
  errorCheck: number[];
  stopBit: number[];
};
