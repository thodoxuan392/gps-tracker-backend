export const START_BIT = [0x78, 0x78];
export const STOP_BIT = [0x0d, 0x0a];
export enum ProtocolNumber {
  LOGIN_MESSAGE = 0x01,
  LOCATION_DATA = 0x12,
  STATUS_INFORMATION = 0x13,
  STRING_INFORMATION = 0x14,
  ALARM_DATA = 0x15,
  GPS_QUERY_ADD_BY_PHONE = 0x1a,
  COMMAND_BY_SERVER = 0x80,
}
