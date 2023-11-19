import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  DeviceModel,
  DeviceRepositoryPort,
} from './device-repository.interface';
import {
  MONGO_DB_CLIENT,
  MongoDBClientPort,
} from 'infra/mongodb-client/mongodb-client.interface';

@Injectable()
export class DeviceRepositoryService implements DeviceRepositoryPort {
  private _logger = new Logger(DeviceRepositoryService.name);
  private COLLECTION_NAME = 'device';
  constructor(
    @Inject(MONGO_DB_CLIENT) private _mongodbClient: MongoDBClientPort,
  ) {}

  async create(model: DeviceModel): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection(this.COLLECTION_NAME);
    await collection.insertOne(model);
  }
  async findById(id: string): Promise<DeviceModel> {
    const collection = this._mongodbClient
      .getDB()
      .collection(this.COLLECTION_NAME);
    return await collection.findOne<DeviceModel>({
      deviceId: id,
    });
  }

  async findAll(): Promise<DeviceModel[]> {
    const collection = this._mongodbClient
      .getDB()
      .collection<DeviceModel>(this.COLLECTION_NAME);
    const findResult = await collection.find<DeviceModel>({});
    const result: DeviceModel[] = [];
    for await (const model of findResult) {
      result.push(model);
    }
    return result;
  }
  async update(model: DeviceModel): Promise<void> {
    const { deviceId } = model;
    const collection = this._mongodbClient
      .getDB()
      .collection<DeviceModel>(this.COLLECTION_NAME);
    await collection.updateOne(
      {
        deviceId: deviceId,
      },
      {
        $set: model,
      },
    );
  }

  async deleteById(id: string): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection<DeviceModel>(this.COLLECTION_NAME);
    await collection.deleteOne({
      deviceId: id,
    });
  }
}
