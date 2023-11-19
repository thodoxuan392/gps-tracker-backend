import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  LocationModel,
  LocationRepositoryPort,
} from './location-repository.interface';
import {
  MONGO_DB_CLIENT,
  MongoDBClientPort,
} from 'infra/mongodb-client/mongodb-client.interface';

@Injectable()
export class LocationRepositoryService implements LocationRepositoryPort {
  private _logger = new Logger(LocationRepositoryService.name);
  private COLLECTION_NAME = 'location';
  constructor(
    @Inject(MONGO_DB_CLIENT) private _mongodbClient: MongoDBClientPort,
  ) {}
  async create(model: LocationModel): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection(this.COLLECTION_NAME);
    await collection.insertOne(model);
  }
  async findByDeviceId(deviceId: string): Promise<LocationModel[]> {
    const collection = this._mongodbClient
      .getDB()
      .collection<LocationModel>(this.COLLECTION_NAME);
    const findResult = await collection.find<LocationModel>({
      deviceId: deviceId,
    });
    let result: LocationModel[];
    for await (const model of findResult) {
      result.push(model);
    }
    return result;
  }

  async findAll(): Promise<LocationModel[]> {
    const collection = this._mongodbClient
      .getDB()
      .collection<LocationModel>(this.COLLECTION_NAME);
    const findResult = await collection.find<LocationModel>({});
    const result: LocationModel[] = [];
    for await (const model of findResult) {
      result.push(model);
    }
    return result;
  }
  async update(model: LocationModel): Promise<void> {
    const { deviceId } = model;
    const collection = this._mongodbClient
      .getDB()
      .collection<LocationModel>(this.COLLECTION_NAME);
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
      .collection<LocationModel>(this.COLLECTION_NAME);
    await collection.deleteMany({
      deviceId: deviceId,
    });
  }
  async deleteAll(): Promise<void> {
    const collection = this._mongodbClient
      .getDB()
      .collection<LocationModel>(this.COLLECTION_NAME);
    await collection.deleteMany();
  }
}
