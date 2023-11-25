export const LOCATION_REPOSITORY = Symbol('LocationRepositoryPort');

export interface LocationRepositoryPort {
  create(model: LocationModel): Promise<void>;
  update(model: LocationModel): Promise<void>;
  deleteByDeviceId(id: string): Promise<void>;
  deleteAll(): Promise<void>;
  findAll(): Promise<LocationModel[]>;
  findByDeviceId(deviceId: string): Promise<LocationModel[]>;
}

export type LocationModel = {
  deviceId: string;
  latitude: Latitude;
  latitudeDirection: LatitudeDirection;
  longitude: Longitude;
  longitudeDirection: LongitudeDirection;
  speed: number;
  updatedAt: string;
  createdAt: string;
};

export type Latitude = {
  degree: number;
  minute: number;
};

export type Longitude = Latitude;

export enum LongitudeDirection {
  EAST_LONGITUDE = 'East Longitude',
  WEST_LONGITUDE = 'West Longitude',
}

export enum LatitudeDirection {
  SOUTH_LATITUDE = 'South Latitude',
  NORTH_LATITUDE = 'North Latitude',
}
