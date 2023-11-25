import {
  CommandId,
  FeedbackId,
  LatitudeSign,
  LongitudeSign,
} from '../enum/enum';

/**
 * Command
 */
export type CommandBase<CommandId, Params> = {
  manufacturerName: string;
  vehicleId: string;
  cmd: CommandId;
  time: Time;
  params?: Params;
};
export type FixedPositionMonitorCommand = CommandBase<
  CommandId.FIXED_POSITION_MONITOR,
  {
    interval: number;
    count: number;
  }
>;
export type AutomaticMonitorCommand = CommandBase<
  CommandId.AUTOMATIC_MONITOR,
  {
    interval: number;
  }
>;
export type CleanOutAlarmCommand = CommandBase<CommandId.CLEAN_OUT_ALARM, {}>;

export type ColdStartCommand = CommandBase<CommandId.COLD_START, {}>;

export type Command =
  | FixedPositionMonitorCommand
  | AutomaticMonitorCommand
  | CleanOutAlarmCommand
  | ColdStartCommand;

/**
 * Feedback
 */
export type FeedbackGeneral = {
  manufacturerName: string;
  vehicleId: string;
  id: FeedbackId;
  vehicleTime: Time;
  dataAvailable: boolean;
  latitude: Latitude;
  latitudeSign: LatitudeSign;
  longitude: Longitude;
  longitudeSign: LongitudeSign;
  speed: number;
  direction: number;
  date: Date;
  vehicleStatus: FeedbackVehicleStatus | AlarmVehicleStatus;
};

export type FeedbackConfirm = {
  manufacturerName: string;
  vehicleId: string;
  id: FeedbackId;
  cmd: CommandId;
  confirmedTime: Time;
  vehicleTime: Time;
  dataAvailable: boolean;
  latitude: Latitude;
  latitudeSign: LatitudeSign;
  longitude: Longitude;
  longitudeSign: LongitudeSign;
  speed: number;
  direction: number;
  date: Date;
  vehicleStatus: FeedbackVehicleStatus;
};

export type Response = FeedbackConfirm | FeedbackGeneral;

/**
 * Time
 */
export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};
export type Date = {
  day: number;
  month: number;
  year: number;
};

export type Latitude = Longitude;
export type Longitude = {
  degree: number;
  minute: number;
};

export type FeedbackVehicleStatus = {
  stealAlarm: boolean;
  passwordWrongAlarm: boolean;
  sos: boolean;
  powerCarOffAlarm: boolean;
  gpsReceiveFault: boolean;
  externalCut: boolean;
  doorOpen: boolean;
  vehicleDefense: boolean;
  accClose: boolean;
  lowPower: boolean;
  batteryBad: boolean;
  engine: boolean;
  overSpeedAlarm: boolean;
  illegalEngineAlarm: boolean;
};

export type AlarmVehicleStatus = {
  temperatureAlarm: boolean;
  towAlert: boolean;
  gprsBlockAlarm: boolean;
  cutFuelAndPowerStatus: boolean;
  powerOffAlarm: boolean;
  highPowerSensor1: boolean;
  highPowerSensor2: boolean;
  lowPowerSensor1ByIron: boolean;
  gpsFaultAlarm: boolean;
  shakeAlarm: boolean;
  powerFromBackupBattery: boolean;
  powerTakeOut: boolean;
  gpsCarveOut: boolean;
  gpsShortCircuit: boolean;
  lowPowerSensor2ByIron: boolean;
  door: boolean;
  carDefence: boolean;
  accClose: boolean;
  engine: boolean;
  userDefinedAlarm: boolean;
  overSpeed: boolean;
  openTheDoorAlarm: boolean;
  sos: boolean;
  overSpeedAlarm: boolean;
  engineOnAlarm: boolean;
  overDefenceAlarm: boolean;
  overGeoFenceAlarm: boolean;
};
