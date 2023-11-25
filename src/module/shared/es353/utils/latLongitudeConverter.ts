import * as LocationI from 'src/module/repository/location/location-repository.interface';
import { Latitude } from '../types';
import { LatitudeSign, LongitudeSign } from '../enum';
import { ES353 } from '../..';

export function cvtStringToLatLongitude(data: string): Latitude {
  const degree = Number(data.substring(0, 2));
  const minute = Number(data.substring(2, data.length));
  return {
    degree,
    minute,
  };
}

export function cvtLatLongitudeToString(data: Latitude): string {
  return String(data.degree) + String(data.minute);
}

export function cvtLatLongToStd(data: Latitude): LocationI.Latitude {
  const { degree, minute } = data;
  return {
    degree,
    minute,
  };
}

export function cvtLatSignToDirection(
  data: LatitudeSign,
): LocationI.LatitudeDirection {
  switch (data) {
    case ES353.Enum.LatitudeSign.NORTH_LATITUDE:
      return LocationI.LatitudeDirection.NORTH_LATITUDE;
    case ES353.Enum.LatitudeSign.SOUTH_LATITUDE:
      return LocationI.LatitudeDirection.SOUTH_LATITUDE;
    default:
      break;
  }
}

export function cvtLongSignToDirection(
  data: LongitudeSign,
): LocationI.LongitudeDirection {
  switch (data) {
    case ES353.Enum.LongitudeSign.EAST_LONGITUDE:
      return LocationI.LongitudeDirection.EAST_LONGITUDE;
    case ES353.Enum.LongitudeSign.WEST_LONGITUDE:
      return LocationI.LongitudeDirection.WEST_LONGITUDE;
    default:
      break;
  }
}
