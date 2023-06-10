import {
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './availabilityDTO/createAvailability.dto';
import { UpdateAvailabilityDto } from './availabilityDTO/updateAvailability.dto';
import { PaginationInterceptor } from 'src/interceptors/pagination.interceptor';
@Controller('availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Get()
  @UseInterceptors(PaginationInterceptor)
  getAllAvailability() {
    try {
      return this.availabilityService.getAllAvailabilities();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createAvailability(@Body() availabilityDto: CreateAvailabilityDto) {
    return this.availabilityService.createAvailability(availabilityDto);
  }

  @Get('/:id')
  getAvailability(@Param('id', ParseIntPipe) availabilityId: number) {
    try {
      return this.availabilityService.findAvailabilityById(availabilityId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateAvailability(
    @Param('id', ParseIntPipe) availabilityId: number,
    @Body() updateAvailability: UpdateAvailabilityDto,
  ) {
    try {
      return this.availabilityService.updateAvailability(
        availabilityId,
        updateAvailability,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  deleteAvailability(@Param('id', ParseIntPipe) availabilityId: number) {
    try {
      return this.availabilityService.deleteAvailability(availabilityId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
