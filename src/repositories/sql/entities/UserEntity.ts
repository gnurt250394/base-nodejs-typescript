import { Sequelize, ModelAttributes, UUIDV4, UUID, STRING, ModelOptions, DataTypes } from 'sequelize';

import { ProvideSingleton, inject } from '@/ioc';
import { SQLDbConnection } from '@configs/SQLDbConnection';
import { BaseEntity } from './BaseEntity';

@ProvideSingleton(UserEntity)
export class UserEntity extends BaseEntity {
  public entityName: string = 'user';
  protected attributes: ModelAttributes = {
    _id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  };
  protected options: ModelOptions<any> = { name: { plural: 'users' } };

  constructor(@inject(SQLDbConnection) protected sqlDbConnection: SQLDbConnection) {
    super();
    this.initModel();
  }
}
