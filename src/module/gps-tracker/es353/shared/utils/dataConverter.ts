import { Date, Time } from "../types";

export function cvtDateToString(date: Date): string{
    return String(date.day)+String(date.month)+String(date.year);
}

export function cvtStringToDate(date: string): Date {
    return {
        day: Number(date.substring(0,1)),
        month: Number(date.substring(2,3)),
        year: Number(date.substring(4,5))
    }
}