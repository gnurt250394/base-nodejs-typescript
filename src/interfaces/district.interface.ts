import { Model, Schema } from 'mongoose';
export interface District {
  name: string;
  id_district: string;
  id_city: string;
  type: string;
}
