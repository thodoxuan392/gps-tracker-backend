import { ES353 } from 'src/module/shared';

export class Es353Parser {
  static parseResponse(response: string): ES353.Types.Response {
    // Check START byte
    if (response.at(0) !== ES353.Constant.START_BYTE) {
      console.error(
        `Invalid start byte: ${response.at(0)}, expected ${
          ES353.Constant.START_BYTE
        }`,
      );
      return null;
    }
    // Check STOP bypte
    if (response.at(response.length - 1) !== ES353.Constant.STOP_BYTE) {
      console.error(
        `Invalid stop byte: ${response.at(response.length - 1)}, expected ${
          ES353.Constant.STOP_BYTE
        }`,
      );
      return null;
    }
    const dataSplitted = response
      .slice(1, response.length - 1)
      .split(ES353.Constant.DELIMITER);
    // Check Command Is valud
    if (
      !Object.values(ES353.Enum.FeedbackId).includes(
        dataSplitted[2] as ES353.Enum.FeedbackId,
      )
    ) {
      return null;
    }
    if (dataSplitted[2].length != 2) {
      return null;
    }
    if (dataSplitted[2] == ES353.Enum.FeedbackId.GENERAL) {
      return this._parseFeedbackGeneral(dataSplitted);
    }
    if (dataSplitted[2] == ES353.Enum.FeedbackId.CONFIRM) {
      return this._parseFeedbackConfirm(dataSplitted);
    }
  }
  private static _parseFeedbackGeneral(
    dataSplitted: string[],
  ): ES353.Types.Response {
    return {
      manufacturerName: dataSplitted[0],
      vehicleId: dataSplitted[1],
      id: dataSplitted[2] as ES353.Enum.FeedbackId,
      vehicleTime: ES353.Utils.cvtStringToTime(dataSplitted[3]),
      dataAvailable: dataSplitted[4] === 'A',
      latitude: ES353.Utils.cvtStringToLatLongitude(dataSplitted[5]),
      latitudeSign: dataSplitted[6] as ES353.Enum.LatitudeSign,
      longitude: ES353.Utils.cvtStringToLatLongitude(dataSplitted[7]),
      longitudeSign: dataSplitted[8] as ES353.Enum.LongitudeSign,
      speed: Number(dataSplitted[9]),
      direction: Number(dataSplitted[10]),
      date: ES353.Utils.cvtStringToDate(dataSplitted[11]),
      vehicleStatus: ES353.Utils.cvtStringToFeedbackVehicleStatus(
        dataSplitted[12],
      ),
    };
  }
  private static _parseFeedbackConfirm(
    dataSplitted: string[],
  ): ES353.Types.Response {
    return {
      manufacturerName: dataSplitted[0],
      vehicleId: dataSplitted[1],
      id: dataSplitted[2] as ES353.Enum.FeedbackId,
      cmd: dataSplitted[3] as ES353.Enum.CommandId,
      confirmedTime: ES353.Utils.cvtStringToTime(dataSplitted[4]),
      vehicleTime: ES353.Utils.cvtStringToTime(dataSplitted[5]),
      dataAvailable: dataSplitted[6] === 'A',
      latitude: ES353.Utils.cvtStringToLatLongitude(dataSplitted[7]),
      latitudeSign: dataSplitted[8] as ES353.Enum.LatitudeSign,
      longitude: ES353.Utils.cvtStringToLatLongitude(dataSplitted[9]),
      longitudeSign: dataSplitted[10] as ES353.Enum.LongitudeSign,
      speed: Number(dataSplitted[11]),
      direction: Number(dataSplitted[12]),
      date: ES353.Utils.cvtStringToDate(dataSplitted[13]),
      vehicleStatus: ES353.Utils.cvtStringToFeedbackVehicleStatus(
        dataSplitted[14],
      ),
    };
  }
}
