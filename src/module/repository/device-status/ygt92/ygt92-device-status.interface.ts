import { DeviceStatusBaseModel } from '../device-status-repository.interface';

export type Ygt92DeviceStatusModel = DeviceStatusBaseModel & {
  metaData: Ygt92DeviceStatusMetaData;
};

export type Ygt92DeviceStatusMetaData = {};
