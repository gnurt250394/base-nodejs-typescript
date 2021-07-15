import { inject, ProvideSingleton } from '@/ioc';
import { IDistrictModel } from '@/models/district.model';
import { MongoDbConnection } from '@configs/MongoDbConnection';
import { Schema } from 'mongoose';
import { DistrictFormatter } from '@models/district.model';
import { BaseRepository } from './BaseRepository';

@ProvideSingleton(DistrictRepository)
export class DistrictRepository extends BaseRepository<IDistrictModel> {
  protected modelName = 'district';
  protected schema: Schema = new Schema(
    {
      name: {
        type: String,
      },
      id_district: {
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
  protected formatter = DistrictFormatter;
  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
