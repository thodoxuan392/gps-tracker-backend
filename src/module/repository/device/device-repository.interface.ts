import { Es353DeviceModel } from './es353/es353-device.interface';
import { Ygt92DeviceModel } from './ygt92/ygt92-device.interface';

export const DEVICE_REPOSITORY = Symbol('DeviceRepositoryPort');

export interface DeviceRepositoryPort {
  create(model: DeviceModel): Promise<void>;
  update(model: DeviceModel): Promise<void>;
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<DeviceModel>;
  findAll(): Promise<DeviceModel[]>;
}

export type DeviceBaseModel = {
  deviceId: string;
  name: string;
  serialNumber: string;
  updatedAt: string;
  createdAt: string;
};

export type DeviceModel = Es353DeviceModel | Ygt92DeviceModel;
