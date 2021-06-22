import { NotificationModel } from '@/interfaces/notification.interface';
import { model, Schema, Document } from 'mongoose';
const notificationSchema = new Schema(
  {
    // id của công việc
    data: {
      type: Object,
    },
    topic: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "notification",
    autoIndex: false,
    timestamps: {
      createdAt: "create_at",
      updatedAt: "update_at",
    },
  }
);

const Notification = model<NotificationModel & Document>("notification", notificationSchema);
export default Notification;
