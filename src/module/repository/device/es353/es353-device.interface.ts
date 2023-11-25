import { DeviceBaseModel } from '../device-repository.interface';

export type Es353DeviceModel = DeviceBaseModel & {
  metaData: Es353DeviceMetaData;
};

export type Es353DeviceMetaData = {
  manufacturerName: string;
};
