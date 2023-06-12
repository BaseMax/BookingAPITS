import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { ResourceModule } from '../resource/resource.module';

@Module({
  providers: [AvailabilityService],
  controllers: [AvailabilityController],
  imports: [PrismaModule , ResourceModule]
})
export class AvailabilityModule {}
