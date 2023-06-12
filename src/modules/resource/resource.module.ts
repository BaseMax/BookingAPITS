import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  providers: [ResourceService],
  controllers: [ResourceController],
  imports: [PrismaModule],
  exports: [ResourceService],
})
export class ResourceModule {}
