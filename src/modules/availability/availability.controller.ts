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
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './availabilityDTO/createAvailability.dto';
import { UpdateAvailabilityDto } from './availabilityDTO/updateAvailability.dto';
import { PaginationInterceptor } from 'src/interceptors/pagination.interceptor';
import { AuthGuard } from '../../guards/auth.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @UseGuards(AuthGuard)
  @Get()
  @UseInterceptors(PaginationInterceptor)
  getAllAvailability() {
    try {
      return this.availabilityService.getAllAvailabilities();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @SetMetadata('isAdmin', true)
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createAvailability(@Body() availabilityDto: CreateAvailabilityDto) {
    return this.availabilityService.createAvailability(availabilityDto);
  }

  @SetMetadata('isAdmin', true)
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Get('/:id')
  getAvailability(@Param('id', ParseIntPipe) availabilityId: number) {
    try {
      return this.availabilityService.getAvailabilityById(availabilityId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @SetMetadata('isAdmin', true)
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
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

  @SetMetadata('isAdmin', true)
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteAvailability(@Param('id', ParseIntPipe) availabilityId: number) {
    try {
      return this.availabilityService.deleteAvailability(availabilityId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
