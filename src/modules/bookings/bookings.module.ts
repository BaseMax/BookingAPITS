import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [BookingsService],
  controllers: [BookingsController],
  imports: [PrismaModule, NotificationModule, UserModule],
})
export class BookingsModule {}
