import { UserFormatter, IUserModel } from '@/models/user.model';
import { Schema } from 'mongoose';

import { BaseRepository } from './BaseRepository';
import { MongoDbConnection } from '@configs/MongoDbConnection';
import { ProvideSingleton, inject } from '@/ioc';

@ProvideSingleton(UserRepository)
export class UserRepository extends BaseRepository<IUserModel> {
  protected modelName = 'medical_record';
  protected schema: Schema = new Schema(
    {
      accessToken: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
      email: {
        type: String,
        default: null,
      },
      dob: {
        type: String,
        default: null,
      },
      password: {
        type: String,
        required: true,
        // select: false,
      },
      phone: {
        type: String || Number,
        minlength: 10,
        maxlength: 11,
        default: null,
        required: true,
      },
      gender: {
        type: String,
        default: null, //male nam,female nữ
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      avatar: {
        type: String,
        default: null,
      },
      role: {
        type: String,
        default: 'user',
      },
      address: {
        type: String,
        default: null,
      },
      province_id: {
        type: String,
        default: null,
      },
      commune_id: {
        type: String,
        default: null,
      },
      district_id: {
        type: String,
        default: null,
      },
      // giới thiệu bản thân
      overview: {
        type: String,
        default: null,
      },
      // trình độ
      level: {
        type: String,
        default: null,
      },
      // kỹ năng
      skill: {
        type: String,
        default: null,
      },
      //kinh nghiệm làm việc
      experience: {
        type: String,
        default: null,
      },
      active: {
        type: Boolean,
        default: false,
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
  protected formatter = UserFormatter;
  constructor(@inject(MongoDbConnection) protected dbConnection: MongoDbConnection) {
    super();
    super.init();
  }
}
