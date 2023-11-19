import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  HeartbeatModel,
  HeartbeatRepositoryPort,
} from './heartbeat-repository.interface';
import {
  MONGO_DB_CLIENT,
  MongoDBClientPort,
} from 'infra/mongodb-client/mongodb-client.interface';

@Injectable()
export class HeartbeatRepositoryService implements HeartbeatRepositoryPort {
  private _logger = new Logger(HeartbeatRepositoryService.name);
  private COLLECTION_NAME = 'heartbeat';
  constructor(
    @Inject(MONGO_DB_CLIENT) private _mongodbClient: MongoDBClientPort,
  ) {}
  async create(model: HeartbeatModel): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection(this.COLLECTION_NAME);
    await collection.insertOne(model);
  }
  async findByDeviceId(deviceId: string): Promise<HeartbeatModel[]> {
    const collection = this._mongodbClient
      .getDB()
      .collection<HeartbeatModel>(this.COLLECTION_NAME);
    const findResult = await collection.find<HeartbeatModel>({
      deviceId: deviceId,
    });
    let result: HeartbeatModel[];
    for await (const model of findResult) {
      result.push(model);
    }
    return result;
  }

  async findAll(): Promise<HeartbeatModel[]> {
    const collection = this._mongodbClient
      .getDB()
      .collection<HeartbeatModel>(this.COLLECTION_NAME);
    const findResult = await collection.find<HeartbeatModel>({});
    const result: HeartbeatModel[] = [];
    for await (const model of findResult) {
      result.push(model);
    }
    return result;
  }
  async update(model: HeartbeatModel): Promise<void> {
    const { deviceId } = model;
    const collection = this._mongodbClient
      .getDB()
      .collection<HeartbeatModel>(this.COLLECTION_NAME);
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
      .collection<HeartbeatModel>(this.COLLECTION_NAME);
    await collection.deleteMany({
      deviceId: deviceId,
    });
  }
  async deleteAll(): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection<HeartbeatModel>(this.COLLECTION_NAME);
    await collection.deleteMany();
  }
}
