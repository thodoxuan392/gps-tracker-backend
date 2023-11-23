import { Login } from "src/module/shared/types";
import { CommandId, FeedbackId, LatitudeSign, LongitudeSign } from "../enum/enum";

/**
 * Command
 */
export type CommandBase<CommandId, Params> = {
    manufacturerName: string;
    vehicalId: string;
    cmd: CommandId;
    time: Time;
    params: Params;
}
export type FixedPositionMonitorCommand = CommandBase<CommandId.FXIED_POSITION_MONITOR, {
    interval: number;
    count: number;
}>;
export type AutomaticMonitorCommand = CommandBase<CommandId.AUTOMATIC_MONITOR, {
    interval: number;
}>;
export type CleanOutAlarmCommand = CommandBase<CommandId.CLEAN_OUT_ALARM, {}>;

export type ColdStartCommand = CommandBase<CommandId.COLD_START,{}>

export type Command = FixedPositionMonitorCommand | AutomaticMonitorCommand | CleanOutAlarmCommand | ColdStartCommand;

/**
 * Feedback
 */
export type FeedbackGeneral = {
    manufacturerName: string;
    id: FeedbackId,
    vehicalId: string;
    vehicalTime: Time; 
    dataAvailable: boolean;
    latitude: Latitude;
    latitudeSign: LatitudeSign;
    longitude: Longitude;
    longitudeSign: LongitudeSign,
    speed: number;
    direction: number;
    date: Date;
    vehicleStatus: {
        gpsReceiveFault: boolean;
        externalCut: boolean;
        doorOpen: boolean;
        vehicleDefense: boolean;
        accClose: boolean;
        lowPower: boolean;
        batteryBad: boolean;
        engin: boolean;
    }
}

export type FeedbackConfirm = {
    manufacturerName: string;
    id: FeedbackId,
    vehicalId: string;
    cmd: CommandId;
    confirmedTime: Time;
    vehicalTime: Time; 
    dataAvailable: boolean;
    latitude: Latitude;
    latitudeSign: LatitudeSign;
    longitude: Longitude;
    longitudeSign: LongitudeSign,
    speed: number;
    direction: number;
    date: Date;
    vehicleStatus: FeedbackVehicleStatus;
}

/**
 * Alarm
 */
export type Alarm = {
    manufacturerName: string;
    id: FeedbackId,
    vehicalId: string;
    vehicalTime: Time; 
    dataAvailable: boolean;
    latitude: Latitude;
    latitudeSign: LatitudeSign;
    longitude: Longitude;
    longitudeSign: LongitudeSign,
    speed: number;
    direction: number;
    date: Date;
    vehicleStatus: AlarmVehicleStatus;
}

export type Response = FeedbackConfirm | FeedbackGeneral | Alarm;

/**
 * Time
 */
export type Time = {
    hours: number;
    minutes: number;
    seconds: number;
}
export type Date = {
    day: number;
    month: number;
    year: number;
}

export type Latitude = Longitude;
export type Longitude = {
    degree: number;
    minute: number;
}

export type FeedbackVehicleStatus =  {
    gpsReceiveFault: boolean;
    externalCut: boolean;
    doorOpen: boolean;
    vehicleDefense: boolean;
    accClose: boolean;
    lowPower: boolean;
    batteryBad: boolean;
    engin: boolean;
}

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
}