import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './userDTO/createUser.dto';
import { UpdateUserDto } from './userDTO/updateUser.dto';
import { PaginationInterceptor } from 'src/interceptors/pagination.interceptor';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseInterceptors(PaginationInterceptor)
  getAllUsers() {
    try {
      return this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createNewUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) userId: number) {
    try {
      return this.userService.getUser(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() userUpdate: UpdateUserDto,
  ) {
    try {
      return this.userService.updateUser(userId, userUpdate);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    try {
      return this.userService.deleteUser(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
