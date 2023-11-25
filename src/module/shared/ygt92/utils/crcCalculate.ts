export function crcCalculate(data: Uint8Array): number {
  let crc = 0xff;
  crc = ~crc;
  crc &= 0xffff;
  data.forEach((value) => {
    crc ^= value;
    for (let k = 0; k < 8; k++) {
      crc = crc & 1 ? (crc >> 1) ^ 0x8408 : crc >> 1;
    }
  });
  crc ^= 0xffff;
  return crc;
}
