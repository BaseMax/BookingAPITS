import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController],
  imports: [PrismaModule],
  exports: [NotificationService],
})
export class NotificationModule {}
