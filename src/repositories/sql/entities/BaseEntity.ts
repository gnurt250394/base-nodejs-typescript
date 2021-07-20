import { decorate, injectable } from 'inversify';
import { Sequelize, ModelAttributes, ModelOptions, ModelCtor, SyncOptions } from 'sequelize';

import { SQLDbConnection } from '@configs/SQLDbConnection';
import { Logger } from '@/utils/logger';

export abstract class BaseEntity {
  public entityName: string;
  public model: ModelCtor<any>;
  protected sqlDbConnection: SQLDbConnection;
  protected attributes: ModelAttributes;
  protected options: ModelOptions<any>;

  protected initModel(): void {
    this.model = this.sqlDbConnection.db.define(this.entityName, this.attributes, this.options);
  }

  protected sync(options?: SyncOptions): Promise<any> {
    Logger.log(`synchronizing: ${this.entityName}${options ? ` with options: ${JSON.stringify(options)}` : ''}`);
    return this.model.sync(options) as any;
  }
}

decorate(injectable(), BaseEntity);
