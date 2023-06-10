import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResourceModule } from './resource/resource.module';
import { AvailabilityModule } from './availability/availability.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PaginationInterceptor } from './interceptors/pagination.interceptor';

@Module({
  imports: [
    UserModule,
    BookingsModule,
    AuthModule,
    PrismaModule,
    ResourceModule,
    AvailabilityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
