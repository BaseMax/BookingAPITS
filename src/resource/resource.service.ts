import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResourceDto } from './resourceDTO/createResource.dto';

@Injectable()
export class ResourceService {
  constructor(private prismaService: PrismaService) {}

  async getAllResource() {
    try {
      return await this.prismaService.resource.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createResource(resourecDto: CreateResourceDto) {
    try {
      let createdResource = await this.prismaService.resource.create({
        data: resourecDto,
      });
      return createdResource;
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
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
      throw new Error(error);
    }
  }
}
