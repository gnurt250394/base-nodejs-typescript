import { BaseFormatter } from './BaseFormatter';

export interface INotificationModel {
  _id?: string;
  id?: string;
  data?: object;
  topic?: string;
  title?: string;
  body?: string;
  type?: string;
  isRead?: boolean;
}

export class NotificationFormatter extends BaseFormatter implements INotificationModel {
  data = undefined;
  topic = undefined;
  title = undefined;
  body = undefined;
  type = undefined;
  isRead = undefined;
  constructor(args: any) {
    super();
    this.format(args);
  }
}
