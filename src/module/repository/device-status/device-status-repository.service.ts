import { Inject, Injectable, Logger } from '@nestjs/common';
import { DeviceStatusModel, DeviceStatusRepositoryPort } from './device-status-repository.interface';
import {
  MONGO_DB_CLIENT,
  MongoDBClientPort,
} from 'infra/mongodb-client/mongodb-client.interface';

@Injectable()
export class DeviceStatusRepository implements DeviceStatusRepositoryPort {
  private _logger = new Logger(DeviceStatusRepository.name);
  private COLLECTION_NAME = 'device-status';
  constructor(
    @Inject(MONGO_DB_CLIENT) private _mongodbClient: MongoDBClientPort,
  ) {}
  async create(model: DeviceStatusModel): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection(this.COLLECTION_NAME);
    await collection.insertOne(model);
  }
  async findByDeviceId(deviceId: string): Promise<DeviceStatusModel[]> {
    const collection = this._mongodbClient
      .getDB()
      .collection<DeviceStatusModel>(this.COLLECTION_NAME);
    const findResult = await collection.find<DeviceStatusModel>({
      deviceId: deviceId,
    });
    let result: DeviceStatusModel[];
    for await (const model of findResult) {
      result.push(model);
    }
    return result;
  }

  async findAll(): Promise<DeviceStatusModel[]> {
    const collection = this._mongodbClient
      .getDB()
      .collection<DeviceStatusModel>(this.COLLECTION_NAME);
    const findResult = await collection.find<DeviceStatusModel>({});
    const result: DeviceStatusModel[] = [];
    for await (const model of findResult) {
      result.push(model);
    }
    return result;
  }
  async update(model: DeviceStatusModel): Promise<void> {
    const { deviceId } = model;
    const collection = this._mongodbClient
      .getDB()
      .collection<DeviceStatusModel>(this.COLLECTION_NAME);
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
      .collection<DeviceStatusModel>(this.COLLECTION_NAME);
    await collection.deleteMany({
      deviceId: deviceId,
    });
  }
  async deleteAll(): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection<DeviceStatusModel>(this.COLLECTION_NAME);
    await collection.deleteMany();
  }
}
