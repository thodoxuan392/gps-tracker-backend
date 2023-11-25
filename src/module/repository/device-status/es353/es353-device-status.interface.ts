import { ES353 } from 'src/module/shared';
import { DeviceStatusBaseModel } from '../device-status-repository.interface';

export type Es353DeviceStatusModel = DeviceStatusBaseModel & {
  metaData: Es353DeviceStatusMetaData;
};

export type Es353DeviceStatusMetaData = {
  vehicleStatus:
    | ES353.Types.FeedbackVehicleStatus
    | ES353.Types.AlarmVehicleStatus;
};
