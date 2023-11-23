import { Constant } from "../shared";
import { Command } from "../shared/types";
import { cvtTimeToString } from "../shared/utils/timerConverter";

export class Es353Builder {
  static buildCommand(command: Command): string {
    const elementArray = [];
    let result = "";
    result += Constant.START_BYTE;
    elementArray.push(command.manufacturerName);
    elementArray.push(command.vehicalId);
    elementArray.push(command.cmd);
    elementArray.push(cvtTimeToString(command.time));
    Object.keys(command.params).forEach((key) => {
      elementArray.push(command.params[key]);
    })
    result += elementArray.join(Constant.DELIMITER);
    result += Constant.STOP_BYTE;
    return result;
  }
}
