import { Logger } from '@/utils/logger';
import mongoose, { connect } from 'mongoose';

import constants from './constants';
import { ProvideSingleton } from '@/ioc';

mongoose.set('debug', process.env.NODE_ENV !== 'test');

@ProvideSingleton(MongoDbConnection)
export class MongoDbConnection {
  public db: mongoose.Connection;
  private readonly connectionString: string = constants.mongoConnectionString;

  constructor() {
    Logger.info(`connecting to ${constants.environment} MongoDb`);

    this.db = mongoose.createConnection(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'user',
    });
  }
}
