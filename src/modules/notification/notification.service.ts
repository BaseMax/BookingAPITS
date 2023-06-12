import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateNotificationDto } from './notificationDto/createNotification.dto';
import { Notification } from '@prisma/client';
import * as firebase from 'firebase-admin';
import * as path from 'path';

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, '..', '..', '..', 'firebase-adminsdk.json'),
  ),
});

@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService) {}

  async createNotification(
    notificationDto: CreateNotificationDto,
  ): Promise<Notification | null> {
    try {
      let createdNotification = await this.prismaService.notification.create({
        data: notificationDto,
      });
      let { title, body } = notificationDto;
      await firebase
        .messaging()
        .send({
          notification: { title, body },
          token: notificationDto.notification_token,
        })
        .catch((error: any) => {
          console.error('error while sending message: ', error);
        });
      return createdNotification;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
