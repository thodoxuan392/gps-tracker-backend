import { AlarmVehicleStatus, FeedbackVehicleStatus } from '../types';

enum VehicleStatusField {
  STEAL_ALARM,
  PASSWORD_WRONG_ALARM,
  SOS,
  POWER_OF_CAR_OFF_ALARM,
  GPS_RECEIVE_FAULT,
  EXTERNAL_CUT,
  DOOR_OPEN,
  VEHICLE_DEFENCE,
  ACC_CLOSE,
  LOW_POWER,
  BATTERY_BAD,
  ENGINE,
  OVER_SPEED_ALARM,
  ILLEGAL_ENGINE_ALARM,
}

const VEHICLE_STATUS_MAPPING = new Map<
  VehicleStatusField,
  { bytes: number; bits: number }
>([
  [VehicleStatusField.STEAL_ALARM, { bytes: 0, bits: 0 }],
  [VehicleStatusField.PASSWORD_WRONG_ALARM, { bytes: 0, bits: 1 }],
  [VehicleStatusField.SOS, { bytes: 0, bits: 2 }],
  [VehicleStatusField.POWER_OF_CAR_OFF_ALARM, { bytes: 0, bits: 4 }],
  [VehicleStatusField.GPS_RECEIVE_FAULT, { bytes: 1, bits: 0 }],
  [VehicleStatusField.EXTERNAL_CUT, { bytes: 1, bits: 3 }],
  [VehicleStatusField.DOOR_OPEN, { bytes: 2, bits: 0 }],
  [VehicleStatusField.VEHICLE_DEFENCE, { bytes: 2, bits: 1 }],
  [VehicleStatusField.ACC_CLOSE, { bytes: 2, bits: 2 }],
  [VehicleStatusField.LOW_POWER, { bytes: 2, bits: 3 }],
  [VehicleStatusField.BATTERY_BAD, { bytes: 2, bits: 4 }],
  [VehicleStatusField.ENGINE, { bytes: 2, bits: 5 }],
  [VehicleStatusField.OVER_SPEED_ALARM, { bytes: 3, bits: 2 }],
  [VehicleStatusField.ILLEGAL_ENGINE_ALARM, { bytes: 3, bits: 3 }],
]);

function getVehicleStatusField(
  field: VehicleStatusField,
  data: string,
): boolean {
  const byte = VEHICLE_STATUS_MAPPING.get(field).bytes;
  const bits = VEHICLE_STATUS_MAPPING.get(field).bits;
  const hexData =
    (parseInt(data.charAt(byte), 16) << 4) +
    parseInt(data.charAt(byte + 1), 16);
  return ((hexData >> bits) & 0x01) != 0;
}

export function cvtStringToFeedbackVehicleStatus(
  data: string,
): FeedbackVehicleStatus {
  if (data.length != 8) {
    console.error(
      `Length of data ${data} is ${data.length} bytes, must be 8 bytes`,
    );
    return;
  }
  const result: FeedbackVehicleStatus = {
    stealAlarm: getVehicleStatusField(VehicleStatusField.STEAL_ALARM, data),
    passwordWrongAlarm: getVehicleStatusField(
      VehicleStatusField.PASSWORD_WRONG_ALARM,
      data,
    ),
    sos: getVehicleStatusField(VehicleStatusField.SOS, data),
    powerCarOffAlarm: getVehicleStatusField(
      VehicleStatusField.POWER_OF_CAR_OFF_ALARM,
      data,
    ),
    gpsReceiveFault: getVehicleStatusField(
      VehicleStatusField.GPS_RECEIVE_FAULT,
      data,
    ),
    externalCut: getVehicleStatusField(VehicleStatusField.EXTERNAL_CUT, data),
    doorOpen: getVehicleStatusField(VehicleStatusField.DOOR_OPEN, data),
    vehicleDefense: getVehicleStatusField(
      VehicleStatusField.VEHICLE_DEFENCE,
      data,
    ),
    accClose: getVehicleStatusField(VehicleStatusField.ACC_CLOSE, data),
    lowPower: getVehicleStatusField(VehicleStatusField.LOW_POWER, data),
    batteryBad: getVehicleStatusField(VehicleStatusField.BATTERY_BAD, data),
    engine: getVehicleStatusField(VehicleStatusField.ENGINE, data),
    overSpeedAlarm: getVehicleStatusField(
      VehicleStatusField.OVER_SPEED_ALARM,
      data,
    ),
    illegalEngineAlarm: getVehicleStatusField(
      VehicleStatusField.ILLEGAL_ENGINE_ALARM,
      data,
    ),
  };
  return result;
}

export function cvtStringToAlarmVehicleStatus(
  data: string,
): AlarmVehicleStatus {
  return null;
}
