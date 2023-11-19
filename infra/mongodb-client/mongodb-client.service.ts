import { Inject, Injectable, Logger } from '@nestjs/common';
import { MongoDBClientPort } from './mongodb-client.interface';
import { ConfigService } from '@nestjs/config';
import { Db, MongoClient, ServerApiVersion } from 'mongodb';

type MongoDBServerApi = {
  version: ServerApiVersion;
  strict: boolean;
  deprecationErrors: boolean;
};

@Injectable()
export class MongoDBClient implements MongoDBClientPort {
  private _logger = new Logger(MongoDBClient.name);
  private _connectionString: string;
  private _serverApi: MongoDBServerApi;
  private _dbName: string;
  private _client: MongoClient;
  private _db: Db;
  constructor(@Inject(ConfigService) private _configService: ConfigService) {
    this._connectionString =
      this._configService.get('mongodb').connectionString;
    this._serverApi = this._configService.get('mongodb').serverApi;
    this._dbName = this._configService.get('mongodb').name;
    this._client = new MongoClient(this._connectionString, {
      serverApi: this._serverApi,
    });
    this._connect();
  }

  getDB(): Db {
    return this._db;
  }

  private async _connect(): Promise<void> {
    try {
      await this._client.connect();
      this._db = this._client.db(this._dbName);
    } catch (err) {
      this._logger.error(
        `Cannot connect to MongoDB Server with connectionString: ${
          this._connectionString
        }, serverApi: ${JSON.stringify(this._serverApi)} with error ${err}`,
      );
    }
  }
}
