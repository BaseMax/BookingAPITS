import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './userDTO/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './userDTO/updateUser.dto';
import { User } from '@prisma/client';
const Rounds = 10;

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createUser(userDto: CreateUserDto) {
    try {
      let foundUser = await this.prismaService.user.findUnique({
        where: {
          email: userDto.email,
        },
      });
      if (foundUser) {
        throw new HttpException(
          'user with this email already exists',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      let hashedPassword = await bcrypt.hash(userDto.password, Rounds);
      userDto.password = hashedPassword;
      let createdUser = await this.prismaService.user.create({
        data: userDto,
      });
      let { password, ...result } = createdUser;
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getUser(userId: number) {
    try {
      let foundUser = await this.findUserById(userId);
      this.throwNotFoundIfUserNotProvided(foundUser);
      let { password, ...result } = foundUser;
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateUser(userId: number, updateUser: UpdateUserDto) {
    try {
      let foundUser = await this.findUserById(userId);
      this.throwNotFoundIfUserNotProvided(foundUser);
      let updatedUser = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: updateUser,
      });
      let { password, ...result } = updatedUser;
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteUser(userId: number) {
    try {
      let foundUser = await this.findUserById(userId);
      this.throwNotFoundIfUserNotProvided(foundUser);
      let deletedUser = await this.prismaService.user.delete({
        where: {
          id: userId,
        },
      });

      return deletedUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findUserById(userID: number): Promise<User | null | undefined> {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          id: userID,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async throwNotFoundIfUserNotProvided(user: User) {
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }
}
