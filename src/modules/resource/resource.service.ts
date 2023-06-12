import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { Resource } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateResourceDto } from './resourceDTO/createResource.dto';

@Injectable()
export class ResourceService {
  constructor(private prismaService: PrismaService) {}

  async getAllResource() {
    try {
      return await this.prismaService.resource.findMany();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createResource(resourecDto: CreateResourceDto) {
    try {
      let createdResource = await this.prismaService.resource.create({
        data: resourecDto,
      });
      return createdResource;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateResource(
    resourceId: number,
    updateResourceDto: CreateResourceDto,
  ) {
    try {
      let updatedResource = await this.prismaService.resource.update({
        where: {
          id: resourceId,
        },
        data: updateResourceDto,
      });
      return updatedResource;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteResource(resourceId: number) {
    try {
      let deletedResource = await this.prismaService.resource.delete({
        where: {
          id: resourceId,
        },
      });
      return deletedResource;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getResourceById(resourceId: number): Promise<Resource | undefined> {
    try {
      let foundResource = await this.prismaService.resource.findUnique({
        where: { id: resourceId },
      });
      return foundResource;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async throwIfNotFoundResource(resource: Resource) {
    try {
      if (!resource) {
        throw new HttpException(
          'resource with this id did not found',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
