import { ICommuneModel } from '@models/commune.model';
import { inject, ProvideSingleton } from '@/ioc';
import { IDistrictModel } from '@/models/district.model';
import { MongoDbConnection } from '@configs/MongoDbConnection';
import { Schema } from 'mongoose';
import { DistrictFormatter } from '@models/district.model';
import { BaseRepository } from './BaseRepository';

@ProvideSingleton(CommuneRepository)
export class CommuneRepository extends BaseRepository<ICommuneModel> {
  protected modelName = 'commune';
  protected schema: Schema = new Schema(
    {
      name: {
        type: String,
      },
      id_district: {
        type: String,
      },
      id_commune: {
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
