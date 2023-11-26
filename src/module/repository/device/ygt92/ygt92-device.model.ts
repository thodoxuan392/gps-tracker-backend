import {
  DeviceBaseModel,
  DeviceModelName,
} from '../device-repository.interface';

export type Ygt92DeviceModel = DeviceBaseModel & {
  deviceModel: DeviceModelName.ES353;
};
