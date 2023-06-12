import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './authDto/login.dto';
import { CreateUserDto } from 'src/modules/user/userDTO/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new HttpException("wrong password", HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: user.id, username: user.name , isAdmin : user.isAdmin };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: CreateUserDto) {
    let createdUser = await this.usersService.createUser(signUpDto);
    const payload = { sub: createdUser.id, username: createdUser.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
