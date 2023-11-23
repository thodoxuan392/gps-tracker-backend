import { Constant } from "../shared";
import { CommandId, FeedbackId, LatitudeSign, LongitudeSign } from "../shared/enum/enum";
import { Response } from "../shared/types";
import { cvtStringToDate } from "../shared/utils/dataConverter";
import { cvtStringToLatLongitude } from "../shared/utils/latLongitudeConverter";
import { cvtStringToTime } from "../shared/utils/timerConverter";
import { cvtStringToAlarmVehicleStatus, cvtStringToFeedbackVehicleStatus } from "../shared/utils/vehicleStatusConverter";

export class Es353Parser {
    parseResponse(response: string): Response {
        // Check START byte
        if(response.at(0) !== Constant.START_BYTE){
            return null;
        }
        // Check STOP bypte
        if(response.at(response.length - 1) !== Constant.STOP_BYTE){
            return null;
        }
        const dataSplitted = response.slice(1, response.length - 2).split(Constant.DELIMITER);
        // Check Command Is valud
        if(!Object.values(FeedbackId).includes(dataSplitted[2] as FeedbackId)){
            return null;
        }
        if(dataSplitted[2].length != 2){
            return null;
        }
        if(dataSplitted[2] == FeedbackId.GENERAL){
            return this._parseFeedbackGeneral(dataSplitted);
        }
        if(dataSplitted[2] == FeedbackId.CONFIRM){
            return this._parseFeedbackConfirm(dataSplitted);
        }
    } 
    private _parseFeedbackGeneral(dataSplitted: string[]): Response {
        return {
            manufacturerName: dataSplitted[0],
            vehicalId: dataSplitted[1],
            cmd: dataSplitted[2] as CommandId,
            vehicalTime: cvtStringToTime(dataSplitted[3]),
            dataAvailable: dataSplitted[4] === 'A',
            latitude: cvtStringToLatLongitude(dataSplitted[5]),
            latitudeSign: dataSplitted[6] as LatitudeSign,
            longitude: cvtStringToLatLongitude(dataSplitted[7]),
            longitudeSign: dataSplitted[8] as LongitudeSign,
            speed: Number(dataSplitted[9]),
            direction: Number(dataSplitted[10]),
            date: cvtStringToDate(dataSplitted[11]),
            vehicleStatus: cvtStringToFeedbackVehicleStatus(dataSplitted[12])
        }
    }
    private _parseFeedbackConfirm(dataSplitted: string[]): Response {
        return {
            manufacturerName: dataSplitted[0],
            vehicalId: dataSplitted[1],
            cmd: dataSplitted[2] as CommandId,
            vehicalTime: cvtStringToTime(dataSplitted[3]),
            dataAvailable: dataSplitted[4] === 'A',
            latitude: cvtStringToLatLongitude(dataSplitted[5]),
            latitudeSign: dataSplitted[6] as LatitudeSign,
            longitude: cvtStringToLatLongitude(dataSplitted[7]),
            longitudeSign: dataSplitted[8] as LongitudeSign,
            speed: Number(dataSplitted[9]),
            direction: Number(dataSplitted[10]),
            date: cvtStringToDate(dataSplitted[11]),
            vehicleStatus: cvtStringToAlarmVehicleStatus(dataSplitted[12])
        }
    }
}
