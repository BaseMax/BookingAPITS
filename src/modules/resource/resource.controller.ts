import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './resourceDTO/createResource.dto';
import { PaginationInterceptor } from '../../interceptors/pagination.interceptor';
import { AuthGuard } from '../../guards/auth.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @UseGuards(AuthGuard)
  @Get()
  @UseInterceptors(PaginationInterceptor)
  getAllResource() {
    return this.resourceService.getAllResource();
  }

  @SetMetadata('isAdmin', true)
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createResource(@Body() resourceDto: CreateResourceDto) {
    return this.resourceService.createResource(resourceDto);
  }

  @SetMetadata('isAdmin', true)
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateResource(
    @Param('id', ParseIntPipe) resourceId: number,
    @Body() updateResourceDto: CreateResourceDto,
  ) {
    return this.resourceService.updateResource(resourceId, updateResourceDto);
  }

  @SetMetadata('isAdmin', true)
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteResource(@Param('id', ParseIntPipe) resourceId: number) {
    return this.resourceService.deleteResource(resourceId);
  }
}
