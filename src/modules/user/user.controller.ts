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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './userDTO/createUser.dto';
import { UpdateUserDto } from './userDTO/updateUser.dto';
import { PaginationInterceptor } from 'src/interceptors/pagination.interceptor';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) userId: number) {
    try {
      return this.userService.getUser(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    try {
      return this.userService.deleteUser(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
