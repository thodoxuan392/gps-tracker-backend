import { DeviceModel } from 'src/module/repository/device/device-repository.interface';
import { LocationModel } from 'src/module/repository/location/location-repository.interface';

export const LOCATION_BROADCASTER = Symbol('LocationBroadcasterPort');

export interface LocationBroadcasterPort {
  publish(device: DeviceModel, location: Location);
}

export type Location = Omit<LocationModel, 'updatedAt' | 'createdAt'>;
