import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
  providers: [BookingsService],
  controllers: [BookingsController]
})
export class BookingsModule {}
