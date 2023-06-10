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
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './resourceDTO/createResource.dto';
import { PaginationInterceptor } from '../interceptors/pagination.interceptor';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}
  @Get()
  @UseInterceptors(PaginationInterceptor)
  getAllResource() {
    return this.resourceService.getAllResource();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createResource(@Body() resourceDto: CreateResourceDto) {
    return this.resourceService.createResource(resourceDto);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateResource(
    @Param('id', ParseIntPipe) resourceId: number,
    @Body() updateResourceDto: CreateResourceDto,
  ) {
    return this.resourceService.updateResource(resourceId, updateResourceDto);
  }

  @Delete('/:id')
  deleteResource(@Param('id', ParseIntPipe) resourceId: number) {
    return this.resourceService.deleteResource(resourceId);
  }
}
