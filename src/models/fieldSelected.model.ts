
import { FieldModel } from '@/interfaces/fields.interface';
import { FieldSelectedModel } from '@/interfaces/fieldSelected.interface';
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
    id: { type: Schema.Types.ObjectId, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    dateSelected: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "fieldSelected",
    autoIndex: false,
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
);

const fields = model<FieldSelectedModel & Document>("fieldSelected", usersSchema);
export default fields;
