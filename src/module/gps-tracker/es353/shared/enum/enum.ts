export enum CommandId {
    FXIED_POSITION_MONITOR = 'D1',
    AUTOMATIC_MONITOR = 'S17',
    CLEAN_OUT_ALARM = 'R7',
    COLD_START = 'R1'
}

export enum FeedbackId {
    GENERAL = 'V1',
    CONFIRM = 'V4'
}

export enum LatitudeSign {
    NORTH_LATITUDE = 'N',
    SOUTH_LATITUDE = 'S',
}

export enum LongitudeSign {
    EAST_LONGITUDE = 'E',
    WEST_LONGITUDE = 'W'
}