import { Schema } from 'mongoose';

import { BaseRepository } from './BaseRepository';
import { ProvideSingleton, inject } from '@/ioc';
import { MongoDbConnection } from '@configs/MongoDbConnection';
import { IProvinceModel, ProvinceFormatter } from '@/models/province.model';

@ProvideSingleton(ProvinceRepository)
export class ProvinceRepository extends BaseRepository<IProvinceModel> {
  protected modelName = 'province';
  protected schema: Schema = new Schema(
    {
      name: {
        type: String,
      },
      id_city: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    {
      collection: this.modelName,
      autoIndex: false,
      timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at',
      },
    },
  );
  protected formatter = ProvinceFormatter;
  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
