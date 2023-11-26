import {
  DeviceBaseModel,
  DeviceModelName,
} from '../device-repository.interface';

export type Es353DeviceModel = DeviceBaseModel & {
  deviceModel: DeviceModelName.ES353;
  metaData: Es353DeviceMetaData;
};

export type Es353DeviceMetaData = {
  manufacturerName: string;
};
