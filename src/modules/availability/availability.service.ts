import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Availability } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ResourceService } from '../resource/resource.service';
import { CreateAvailabilityDto } from './availabilityDTO/createAvailability.dto';
import { UpdateAvailabilityDto } from './availabilityDTO/updateAvailability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    private prismaService: PrismaService,
    private resourceService: ResourceService,
  ) {}
  async getAllAvailabilities() {
    try {
      return await this.prismaService.availability.findMany({
        include: {
          slots: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createAvailability(availabilityDto: CreateAvailabilityDto) {
    try {
      let foundResource = await this.resourceService.getResourceById(
        availabilityDto.resourceId,
      );
      await this.resourceService.throwIfNotFoundResource(foundResource);
      let createdAvailability = await this.prismaService.availability.create({
        data: {
          ...availabilityDto,
          slots: {
            create: availabilityDto.slots,
          },
        },
        include: {
          slots: true,
        },
      });
      return createdAvailability;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateAvailability(
    availablityId: number,
    updateAvailability: UpdateAvailabilityDto,
  ) {
    try {
      let updatedAvailability = await this.prismaService.availability.update({
        where: {
          id: availablityId,
        },
        data: {
          ...updateAvailability,
          slots: {
            create: updateAvailability.slots,
          },
        },
        include: {
          slots: true,
        },
      });
      return updatedAvailability;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteAvailability(availabilityId: number) {
    try {
      let availability = await this.findAvailabilityById(availabilityId);
      this.throwNotFoundIfAvailabilityNotProvided(availability);
      let deletedAvailability = await this.prismaService.availability.delete({
        where: {
          id: availabilityId,
        },
      });
      return deletedAvailability;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getAvailabilityById(availabilityId: number) {
    try {
      let foundAvailability = await this.findAvailabilityById(availabilityId);
      await this.throwNotFoundIfAvailabilityNotProvided(foundAvailability);
      return foundAvailability;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAvailabilityById(
    availabilityId: number,
  ): Promise<Availability | null | undefined> {
    try {
      return await this.prismaService.availability.findUnique({
        where: {
          id: availabilityId,
        },
        include: {
          slots: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async throwNotFoundIfAvailabilityNotProvided(availability: Availability) {
    if (!availability)
      throw new HttpException('availibility not found', HttpStatus.NOT_FOUND);
  }
}
