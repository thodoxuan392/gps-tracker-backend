import { Time } from "../types";

export function cvtTimeToString(time: Time): string{
    return String(time.hours)+String(time.minutes)+String(time.seconds);
}

export function cvtStringToTime(time: string): Time {
    return {
        hours: Number(time.substring(0,1)),
        minutes: Number(time.substring(2,3)),
        seconds: Number(time.substring(4,5))
    }
}