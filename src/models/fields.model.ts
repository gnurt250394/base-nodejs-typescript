import { FieldModel } from '@/interfaces/fields.interface';
import { model, Schema, Document } from 'mongoose';
const usersSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    note: {
      type: String,
      default: null,
    },
  },
  {
    collection: "fields",
    autoIndex: false,
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
);

const fields = model<FieldModel & Document>("fields", usersSchema);
export default fields;
