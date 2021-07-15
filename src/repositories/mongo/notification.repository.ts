import { inject, ProvideSingleton } from '@/ioc';
import { INotificationModel } from '@/models/notification.model';
import { ProvinceFormatter } from '@/models/province.model';
import { MongoDbConnection } from '@configs/MongoDbConnection';
import { Schema } from 'mongoose';
import { BaseRepository } from './BaseRepository';

@ProvideSingleton(NotificationRepository)
export class NotificationRepository extends BaseRepository<INotificationModel> {
  protected modelName = 'notification';
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
