import { DistrictModel } from '@/interfaces/district.interface';
import { model, Schema, Document } from 'mongoose';
const usersSchema = new Schema(
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
    collection: "district",
    autoIndex: false,
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
);

const users = model<DistrictModel & Document>("district", usersSchema);
export default users;
