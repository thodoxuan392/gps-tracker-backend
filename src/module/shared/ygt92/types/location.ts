import { PacketBase } from './packet-base';

export type Location = PacketBase<LocationContent>;

export type LocationContent = {
  gpsInformation: {
    dataTime: number[];
    quantityOfInformation: number;
    latitude: number[];
    longitude: number[];
    speed: number;
    courseStatus: number[];
  };
  lbsInformation: {
    mcc: number[];
    mnc: number;
    lac: number[];
    cellId: number[];
  };
};
