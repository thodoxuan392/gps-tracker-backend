import { PacketBase } from './packet-base';

export type HeartBeat = PacketBase<HeartBeatContent>;
export type HeartBeatContent = {
  statusInformation: {
    terminalInformation: number;
    voltageLevel: number;
    gsmSignalStrength: number;
    alarmLanguage: number;
  };
};

export type HeartBeatResponse = PacketBase;
