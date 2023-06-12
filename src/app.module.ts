import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ResourceModule } from './modules/resource/resource.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PaginationInterceptor } from './interceptors/pagination.interceptor';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    UserModule,
    BookingsModule,
    AuthModule,
    PrismaModule,
    ResourceModule,
    AvailabilityModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
