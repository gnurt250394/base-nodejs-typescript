import { inject, ProvideSingleton } from '@/ioc';
import { INotificationModel } from '@/models/notification.model';
import { NotificationRepository } from '@/repositories/mongo/notification.repository';
import { Logger } from '@/utils/logger';
import admin from 'firebase-admin';
import { BaseService } from './BaseService';

@ProvideSingleton(NotificationService)
class NotificationService extends BaseService<INotificationModel> {
  constructor(@inject(NotificationRepository) protected repository: NotificationRepository) {
    super();
  }

  public async sendNotification(notificationData: INotificationModel) {
    try {
      const { data, topic, title, body, type } = notificationData;
      let data2 = JSON.stringify(data);
      let response = await admin.messaging().sendToTopic(topic, {
        notification: {
          badge: '1',
          body,
          title,
        },
        data: { data: data2, type },
      });
      let res = await this.repository.create({
        topic,
        body,
        title,
        data,
        type,
      });

      Logger.info('FIREBASE-sendNotification', response);
      return response;
    } catch (error) {
      Logger.error('FIREBASE-sendNotification', error);
      return error;
    }
  }
  public async subscribeToTopic(token: string, topic: string) {
    try {
      let response = await admin.messaging().subscribeToTopic(token, topic.toString());
      Logger.info('FIREBASE-subscribeToTopic', response);
    } catch (error) {
      Logger.error('FIREBASE-subscribeToTopic', error);
    }
  }
  public async unsubscribeFromTopic(token: string, topic: string) {
    try {
      let response = await admin.messaging().unsubscribeFromTopic(token, topic.toString());
      Logger.info('FIREBASE-unSubscribeFromTopic', response);
    } catch (error) {
      Logger.error('FIREBASE-unSubscribeFromTopic', error);
    }
  }
}

export default NotificationService;
