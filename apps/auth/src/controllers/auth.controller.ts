import { BcryptAdapter } from '@app/utils';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../dtos';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto): Promise<any> {
    const rdm = 100000 + Math.random() * 900000;
    const activationCode = Math.floor(rdm).toString();

    const userExists = await this.authService.findOne({
      email: userDto.email,
    });

    if (userExists) {
      const strErr = 'e-mail já cadastrado em nosso sistema';
      throw new HttpException(strErr, HttpStatus.CONFLICT);
    }

    userDto.password = await this.bcryptAdapter.hash(userDto.password);

    const user = await this.authService.create({
      ...userDto,
      activationCode,
    });

    delete user.password;
    delete user.activationCode;

    return { user };
  }

  @Post('/signin')
  async signin(@Body() authDto: AuthUserDto): Promise<any> {
    const { email, password } = authDto;

    const user = await this.authService.findOne({ email });

    if (!user) {
      const strErr = 'e-mail não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const match = await this.bcryptAdapter.compare(password, user.password);

    if (!match) {
      const strErr = 'credenciais inválidas';
      throw new HttpException(strErr, HttpStatus.UNAUTHORIZED);
    }

    if (!user.active) {
      return { _id: user._id };
    }

    const token = await this.jwtService.sign({
      email: user.email,
      id: user._id,
    });

    delete user.password;
    delete user.activationCode;

    return { user, token };
  }
}
