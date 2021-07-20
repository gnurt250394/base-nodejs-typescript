import { Logger } from '@/utils/logger';
import { Sequelize, Dialect, Op } from 'sequelize';

import constants from './constants';
import { ProvideSingleton } from '@/ioc';

@ProvideSingleton(SQLDbConnection)
export class SQLDbConnection {
  public db: Sequelize;

  constructor() {
    Logger.log(`connecting to ${constants.environment} SQL`);
    const { SQL: config } = constants;
    this.db = new Sequelize(config.db, config.username, config.password, {
      port: config.port,
      host: config.host,
      dialect: config.dialect as Dialect,
      logging: l => Logger.verbose(l),
      operatorsAliases: Op as any,
      define: { charset: 'utf8', collate: 'utf8_general_ci' },
    });
  }
}
