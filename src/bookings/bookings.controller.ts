import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Delete,
  Put,
  HttpException,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBookingDto } from './bookingDTO/createBooking.dto';
import { UpdateBookingDto } from './bookingDTO/updateBooking.dto';
import { BookingsService } from './bookings.service';
import { PaginationInterceptor } from 'src/interceptors/pagination.interceptor';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingService: BookingsService) {}
  //this is admin only rout using guard later on...
  @Get()
  @UseInterceptors(PaginationInterceptor)
  getAllBookings() {
    try {
      return this.bookingService.getAllBookings();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createBooking(@Body() newBooking: CreateBookingDto) {
    try {
      return this.bookingService.createNewBooking(newBooking);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/:id')
  getBooking(@Param('id', ParseIntPipe) bookingId: number) {
    try {
      return this.bookingService.getBooking(bookingId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateBooking(
    @Param('id', ParseIntPipe) bookingId: number,
    @Body() updateBooking: UpdateBookingDto,
  ) {
    try {
      return this.bookingService.updateBooking(bookingId, updateBooking);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  deleteBooking(@Param('id', ParseIntPipe) bookingId: number) {
    try {
      return this.bookingService.deleteBooking(bookingId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
