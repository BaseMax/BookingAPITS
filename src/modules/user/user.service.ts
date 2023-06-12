import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from './userDTO/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './userDTO/updateUser.dto';
import { User } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';
import { CreateNotificationDto } from '../notification/notificationDto/createNotification.dto';
const Rounds = 10;

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private notificationService: NotificationService,
  ) {}

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
      let { notification_token, ...userData } = userDto;
      let createdUser = await this.prismaService.user.create({
        data: userData,
      });
      if (userDto.notification_token) {
        this.sendUserCreationPushNotification(
          createdUser,
          userDto.notification_token,
        );
      }
      let { password, ...result } = createdUser;
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getUser(userId: number) {
    try {
      let foundUser = await this.findUserById(userId);
      await this.throwNotFoundIfUserNotProvided(foundUser);
      let { password, ...result } = foundUser;
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateUser(userId: number, updateUser: UpdateUserDto) {
    try {
      let foundUser = await this.findUserById(userId);
      await this.throwNotFoundIfUserNotProvided(foundUser);
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
      await this.throwNotFoundIfUserNotProvided(foundUser);
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

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      let foundUser = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!foundUser) {
        throw new HttpException(
          'there was no user found with this email',
          HttpStatus.NOT_FOUND,
        );
      }
      return foundUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async sendUserCreationPushNotification(
    createdUser: User,
    notificationToken: string,
  ): Promise<CreateNotificationDto | null> {
    try {
      let notificationPayload = {
        userId: createdUser.id,
        title: 'ACCOUNT REGISTERED',
        body: `account with username : ${createdUser.name} has been created successfuly`,
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
