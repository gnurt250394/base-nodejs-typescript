import { ProvinceModel } from '@/interfaces/province.interface';
import { model, Schema, Document } from 'mongoose';
const provinceSchema = new Schema(
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
    collection: "province",
    autoIndex: false,
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
);
const province = model<ProvinceModel & Document>("province", provinceSchema);
export default province
