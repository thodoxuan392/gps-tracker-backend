export const LOGIN_REPOSITORY = Symbol('LoginRepositoryPort');

export interface LoginRepositoryPort {
  create(model: LoginModel): Promise<void>;
  update(model: LoginModel): Promise<void>;
  deleteByDeviceId(id: string): Promise<void>;
  deleteAll(): Promise<void>;
  findAll(): Promise<LoginModel[]>;
  findByDeviceId(deviceId: string): Promise<LoginModel[]>;
}

export type LoginModel = {
  deviceId: string;
  terminalId: string;
  updatedAt: string;
  createdAt: string;
};
