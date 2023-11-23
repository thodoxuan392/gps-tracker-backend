export const DEVICE_STATUS_REPOSITORY = Symbol('DeviceStatusRepositoryPort');

export interface DeviceStatusRepositoryPort {
  create(model: DeviceStatusModel): Promise<void>;
  update(model: DeviceStatusModel): Promise<void>;
  deleteByDeviceId(id: string): Promise<void>;
  deleteAll(): Promise<void>;
  findAll(): Promise<DeviceStatusModel[]>;
  findByDeviceId(deviceId: string): Promise<DeviceStatusModel[]>;
}

export type DeviceStatusModel = {
  deviceId: string;
  isOnline: string;
  updatedAt: string;
  createdAt: string;
};
