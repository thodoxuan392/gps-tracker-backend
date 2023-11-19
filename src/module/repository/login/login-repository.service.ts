import { Inject, Injectable, Logger } from '@nestjs/common';
import { LoginModel, LoginRepositoryPort } from './login-repository.interface';
import {
  MONGO_DB_CLIENT,
  MongoDBClientPort,
} from 'infra/mongodb-client/mongodb-client.interface';

@Injectable()
export class LoginRepositoryService implements LoginRepositoryPort {
  private _logger = new Logger(LoginRepositoryService.name);
  private COLLECTION_NAME = 'location';
  constructor(
    @Inject(MONGO_DB_CLIENT) private _mongodbClient: MongoDBClientPort,
  ) {}
  async create(model: LoginModel): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection(this.COLLECTION_NAME);
    await collection.insertOne(model);
  }
  async findByDeviceId(deviceId: string): Promise<LoginModel[]> {
    const collection = this._mongodbClient
      .getDB()
      .collection<LoginModel>(this.COLLECTION_NAME);
    const findResult = await collection.find<LoginModel>({
      deviceId: deviceId,
    });
    let result: LoginModel[];
    for await (const model of findResult) {
      result.push(model);
    }
    return result;
  }

  async findAll(): Promise<LoginModel[]> {
    const collection = this._mongodbClient
      .getDB()
      .collection<LoginModel>(this.COLLECTION_NAME);
    const findResult = await collection.find<LoginModel>({});
    const result: LoginModel[] = [];
    for await (const model of findResult) {
      result.push(model);
    }
    return result;
  }
  async update(model: LoginModel): Promise<void> {
    const { deviceId } = model;
    const collection = this._mongodbClient
      .getDB()
      .collection<LoginModel>(this.COLLECTION_NAME);
    await collection.updateOne(
      {
        deviceId: deviceId,
      },
      {
        $set: model,
      },
    );
  }

  async deleteByDeviceId(deviceId: string): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection<LoginModel>(this.COLLECTION_NAME);
    await collection.deleteMany({
      deviceId: deviceId,
    });
  }
  async deleteAll(): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection<LoginModel>(this.COLLECTION_NAME);
    await collection.deleteMany();
  }
}
