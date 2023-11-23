import { Latitude } from "../types";

export function cvtStringToLatLongitude(data:string): Latitude {
    const degree = Number(data.substring(0, 1));
    const minute = Number(data.substring(2, data.length - 1));
    return {
        degree,
        minute
    };
}

export function cvtLatLongitudeToString(data: Latitude): string {
    return String(data.degree) + String(data.minute);
}