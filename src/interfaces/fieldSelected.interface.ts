import { Model, Schema } from 'mongoose';
export interface FieldSelected {
  name: string;
  note: string;
  id: string;
  userId: string;
  dateSelected: number;
}
