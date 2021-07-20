import { Sequelize, SyncOptions } from 'sequelize';

import constants from './constants';
import { ProvideSingleton, inject } from '../ioc';
import { SQLDbConnection } from './SQLDbConnection';
import { Logger } from '@/utils/logger';
import { UserEntity } from '../repositories/sql/entities';

@ProvideSingleton(SQLSetupHelper)
export class SQLSetupHelper {
  constructor(
    @inject(SQLDbConnection) private sqlDbConnection: SQLDbConnection,
    @inject(UserEntity) private entity1: UserEntity, // tslint:disable-line
  ) {}

  public async rawQuery<T>(query: string): Promise<any> {
    return this.sqlDbConnection.db.query(query);
  }

  public async sync(options?: SyncOptions): Promise<void> {
    try {
      await this.sqlDbConnection.db.authenticate();
      if (constants.SQL.dialect === 'mysql') await this.rawQuery('SET FOREIGN_KEY_CHECKS = 0');
      Logger.log(`synchronizing: tables${options ? ` with options: ${JSON.stringify(options)}` : ''}`);
      await this.sqlDbConnection.db.sync(options);
    } catch (error) {
      console.log('error: ', error);

    }
  }
}
