import { Model, Schema } from 'mongoose';
export interface Notification {
  // id của công việc
  data: object;
  topic: string;
  title: string;
  body: string;
  type: string;
  isRead?: boolean;
}
