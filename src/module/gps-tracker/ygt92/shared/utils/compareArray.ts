export function compareArray(srcArray: any[], dstArray: any[]): boolean {
  return srcArray.every((value, index) => srcArray[index] === dstArray[index]);
}
