import { Db } from 'mongodb';

export const MONGO_DB_CLIENT = Symbol('MongoDBClientPort');

export interface MongoDBClientPort {
  getDB(): Db;
}
