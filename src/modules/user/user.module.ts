import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [PrismaModule, NotificationModule],
  exports: [UserService],
})
export class UserModule {}
