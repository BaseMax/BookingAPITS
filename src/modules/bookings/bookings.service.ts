import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Booking } from '@prisma/client';
import { Resource } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateBookingDto } from './bookingDTO/createBooking.dto';
import { UpdateBookingDto } from './bookingDTO/updateBooking.dto';
import { CreateNotificationDto } from '../notification/notificationDto/createNotification.dto';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';

@Injectable()
export class BookingsService {
  constructor(
    private prismaService: PrismaService,
    private notificationService: NotificationService,
    private userService: UserService,
  ) {}
  async getAllBookings() {
    try {
      return await this.prismaService.booking.findMany();
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async createNewBooking(bookingDto: CreateBookingDto) {
    try {
      const {
        resourceId,
        userId,
        startDate,
        endDate,
        notes,
        notification_token,
      } = bookingDto;
      let foundResource = await this.findResource(resourceId);
      if (!foundResource) {
        throw new HttpException('resource did not found', HttpStatus.NOT_FOUND);
      }
      let foundUser = await this.userService.findUserById(userId);
      await this.userService.throwNotFoundIfUserNotProvided(foundUser);
      let isAvailable = await this.startAndEndIsInAvailability(bookingDto);
      if (!isAvailable) {
        throw new HttpException(
          'theres no matching slot based on your time',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      let startDateObj = new Date(startDate);
      let endDateObj = new Date(endDate);
      if (startDateObj > endDateObj) {
        throw new HttpException(
          'start date is after end date',
          HttpStatus.BAD_REQUEST,
        );
      }
      let newBooking = await this.prismaService.booking.create({
        data: {
          startDate: startDateObj,
          endDate: endDateObj,
          notes,
          resourceId: resourceId,
          userId: userId,
        },
      });
      if (notification_token) {
        this.sendBookingCreatedPushNotification(
          bookingDto,
          notification_token,
          userId,
        );
      }

      return newBooking;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getBooking(bookingId: number) {
    try {
      let foundBooking = await this.prismaService.booking.findUnique({
        where: {
          id: bookingId,
        },
      });
      if (!foundBooking) {
        throw new HttpException(
          'did not found booking with this id',
          HttpStatus.NOT_FOUND,
        );
      }
      return foundBooking;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateBooking(bookingId: number, bookingDTO: UpdateBookingDto) {
    try {
      let foundBooking = await this.prismaService.booking.findUnique({
        where: {
          id: bookingId,
        },
      });
      if (!foundBooking) {
        throw new HttpException(
          'did not find booking with this id',
          HttpStatus.NOT_FOUND,
        );
      }
      let updatedBooking = await this.prismaService.booking.update({
        where: {
          id: bookingId,
        },
        data: bookingDTO,
      });
      return updatedBooking;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async deleteBooking(bookingId: number) {
    try {
      let foundBooking = await this.prismaService.booking.findUnique({
        where: {
          id: bookingId,
        },
      });
      if (!foundBooking) {
        throw new HttpException(
          'did not find booking with this id',
          HttpStatus.NOT_FOUND,
        );
      }
      let deletedBooking = await this.prismaService.booking.delete({
        where: {
          id: bookingId,
        },
      });
      return deletedBooking;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findResource(resourceId: number): Promise<Resource | null | undefined> {
    try {
      let foundResource = await this.prismaService.resource.findUnique({
        where: {
          id: resourceId,
        },
      });
      if (!foundResource) {
        throw new HttpException(
          'did not found resource with this id',
          HttpStatus.NOT_FOUND,
        );
      }
      return foundResource;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async startAndEndIsInAvailability(
    BookingDto: CreateBookingDto,
  ): Promise<Boolean> {
    try {
      let foundResource = await this.prismaService.resource.findUnique({
        where: {
          id: BookingDto.resourceId,
        },
        include: {
          Availability: {
            include: {
              slots: true,
            },
          },
        },
      });
      let isInAvailabilitie = false;
      let startDateBooking = new Date(BookingDto.startDate);
      let endDateBooking = new Date(BookingDto.endDate);
      let allAvailabilities = foundResource.Availability;

      allAvailabilities.forEach((availability) => {
        availability.slots.forEach((slot) => {
          if (
            startDateBooking.getTime() >= slot.startTime.getTime() &&
            endDateBooking.getTime() <= slot.endTime.getTime()
          ) {
            isInAvailabilitie = true;
          }
        });
      });
      return isInAvailabilitie;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async sendBookingCreatedPushNotification(
    bookingCreated: CreateBookingDto,
    notificationToken: string,
    userId: number,
  ): Promise<CreateNotificationDto | null> {
    try {
      let notificationPayload = {
        userId: userId,
        title: 'BOOKED SUCCESSFULY',
        body: `your meeting will start at : ${bookingCreated.startDate.toString()} and finishes at : ${bookingCreated.endDate.toString()}`,
        device_type: 'webpush',
        notification_token: notificationToken,
      };

      return await this.notificationService.createNotification(
        notificationPayload,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
