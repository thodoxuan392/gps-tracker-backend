import { ES353 } from 'src/module/shared';

export class Es353Builder {
  static buildCommand(command: ES353.Types.Command): string {
    const elementArray = [];
    let result = '';
    result += ES353.Constant.START_BYTE;
    elementArray.push(command.manufacturerName);
    elementArray.push(command.vehicleId);
    elementArray.push(command.cmd);
    elementArray.push(ES353.Utils.cvtTimeToString(command.time));
    Object.keys(command.params || {}).forEach((key) => {
      elementArray.push(command.params[key]);
    });
    result += elementArray.join(ES353.Constant.DELIMITER);
    result += ES353.Constant.STOP_BYTE;
    return result;
  }
}
