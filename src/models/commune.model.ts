import { CommuneModel } from '@/interfaces/commune.interface';
import { model, Schema, Document } from 'mongoose';
const usersSchema = new Schema(
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
    collection: "commune",
    autoIndex: false,
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
);

const users = model<CommuneModel & Document>("commune", usersSchema);
export default users;
