import { PacketBase } from './packet-base';

export type Login = PacketBase<LoginContent>;

export type LoginContent = {
  terminalId: number[];
};

export type LoginResponse = PacketBase;
