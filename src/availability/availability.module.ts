import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AvailabilityService],
  controllers: [AvailabilityController],
  imports: [PrismaModule],
})
export class AvailabilityModule {}
