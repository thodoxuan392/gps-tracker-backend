import { Es353DeviceStatusModel } from './es353/es353-device-status.interface';
import { Ygt92DeviceStatusModel } from './ygt92/ygt92-device-status.interface';

export const DEVICE_STATUS_REPOSITORY = Symbol('DeviceStatusRepositoryPort');

export interface DeviceStatusRepositoryPort {
  create(model: DeviceStatusModel): Promise<void>;
  update(model: DeviceStatusUpdateParams): Promise<void>;
  deleteByDeviceId(id: string): Promise<void>;
  deleteAll(): Promise<void>;
  findAll(): Promise<DeviceStatusModel[]>;
  findByDeviceId(deviceId: string): Promise<DeviceStatusModel>;
}

export type DeviceStatusUpdateParams = Partial<
  Omit<DeviceStatusModel, 'updatedAt' | 'createdAt'>
>;

export type DeviceStatusBaseModel = {
  deviceId: string;
  isOnline: boolean;
  updatedAt: string;
  createdAt: string;
};

export type DeviceStatusModel = Es353DeviceStatusModel | Ygt92DeviceStatusModel;
