import { Controller, Post, ParseIntPipe, Param, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './notificationDto/createNotification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post(':/id')
  sendUserAccountCreationPushNotif(
    @Param('id', ParseIntPipe) userId: number,
    @Body() notificationDto: CreateNotificationDto,
  ) {
    let assignedNotif = { ...notificationDto, userId: userId };
    return this.notificationService.createNotification(assignedNotif);
  }
}
