export const HEARTBEAT_REPOSITORY = Symbol('HeartbeatRepositoryPort');

export interface HeartbeatRepositoryPort {
  create(model: HeartbeatModel): Promise<void>;
  update(model: HeartbeatModel): Promise<void>;
  deleteByDeviceId(id: string): Promise<void>;
  deleteAll(): Promise<void>;
  findAll(): Promise<HeartbeatModel[]>;
  findByDeviceId(deviceId: string): Promise<HeartbeatModel[]>;
}

export type HeartbeatModel = {
  deviceId: string;
  statusInformation: {
    gasOilElectricity: boolean;
    gpsTracking: boolean;
    alarm: TerminalAlarm;
    isCharging: boolean;
    acc: boolean;
    defenseActivated: boolean;
  };
  voltageLevel: VoltageLevel;
  gsmSignalStrengthLevel: GsmSignalStrengthLevel;
  language: Language;
  updatedAt: string;
  createdAt: string;
};

export enum TerminalAlarm {
  SOS = 'sos',
  LOW_BATTERY_ALARM = 'low battery alarm',
  POWER_CUT_ALARM = 'power cut alarm',
  SHOCK_ALARM = 'shock alarm',
  NORMAL = 'normal',
}

export enum VoltageLevel {
  NO_POWER = 'No Power',
  EXTREMELY_LOW_BATTERY = 'Extremely Low Battery',
  VERY_LOW_BATTERY = 'Very Low Battery',
  LOW_BATTERY = 'Low Battery',
  MEDIUM = 'Medium',
  HIGH = 'High',
  VERY_HIGH = 'Very High',
}

export enum GsmSignalStrengthLevel {
  NO_SIGNAL = 'No Signal',
  EXTREME_WEAK_SIGNAL = 'Extremely Weak Signal',
  VERY_WEAK_SIGNAL = 'Very Weak Signal',
  GOOD_SIGNAL = 'Good Signal',
  STRONG_SIGNAL = 'Strong Signal',
}

export enum Language {
  CHINESE = 'Chinese',
  ENGLISH = 'English',
}
