export const DEVICE_REPOSITORY = Symbol('DeviceRepositoryPort');

export interface DeviceRepositoryPort {
  create(model: DeviceModel): Promise<void>;
  update(model: DeviceModel): Promise<void>;
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<DeviceModel>;
  findAll(): Promise<DeviceModel[]>;
}

export type DeviceModel = {
  deviceId: string;
  name: string;
  serialNumber: string;
  updatedAt: string;
  createdAt: string;
};
