import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [BookingsService],
  controllers: [BookingsController],
  imports: [PrismaModule],
})
export class BookingsModule {}
