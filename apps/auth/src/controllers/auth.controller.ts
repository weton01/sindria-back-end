import { BcryptAdapter } from '@app/utils';
import { JwtAuthGuard } from '@app/utils/guards';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ActiveUserDto,
  CreateUserDto,
  RecoverCallbackDto,
  UpdateUserDto,
} from '../dtos';

import { AuthUserDto } from '../dtos/auth-user.dto';
import { AuthService } from '../services/auth.service';
import { RecoverPasswordDto } from '../dtos/recover-password.dto';
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto): Promise<any> {
    const rdm = 1000 + Math.random() * 9000;
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

    this.mailerService.sendMail({
      to: user.email,
      from: 'lich@lichdata.com',
      subject: 'Recuperação de senha',
      template: '../templates/email-confirmation',
      context: {
        activationCode: user.activationCode,
      },
    });

    delete user.password;
    delete user.activationCode;

    return { user };
  }

  @Post('/signin')
  @HttpCode(200)
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
      return { _id: user._id, active: user.active };
    }

    const token = await this.jwtService.sign({
      email: user.email,
      id: user._id,
    });

    delete user.password;
    delete user.activationCode;

    return { user, token };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update-credentials')
  async update(@Req() req, @Body() updateDto: UpdateUserDto): Promise<any> {
    const { userId } = req.user;
    updateDto.password = await this.bcryptAdapter.hash(updateDto.password);

    const user = await this.authService.update(userId, updateDto);

    return { user };
  }

  @HttpCode(200)
  @Post('/recover-password')
  async recoverPassword(
    @Body() recoverPasswordDto: RecoverPasswordDto,
  ): Promise<any> {
    const user = await this.authService.findOne({
      email: recoverPasswordDto.email,
    });

    if (!user) {
      const strErr = 'e-mail não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const token = this.jwtService.sign({ _id: user._id });

    this.mailerService.sendMail({
      to: user.email,
      from: 'lich@lichdata.com',
      subject: 'Recuperação de senha',
      template: '../templates/recover-password',
      context: {
        token,
      },
    });

    return { message: 'o link de recuperação foi enviado ao seu e-mail' };
  }

  @Patch('/recover-password/callback/:token')
  async recoverPasswordCallback(
    @Param('token') token: string,
    @Body() recoverPasswordCallbackDto: RecoverCallbackDto,
  ): Promise<any> {
    const decodedToken = this.jwtService.verify(token);

    await this.authService.changePassword(
      decodedToken,
      recoverPasswordCallbackDto.password,
    );

    return { message: 'sucesso' };
  }

  @Patch('/active-user/:_id')
  async activeUser(
    @Param('_id') _id: string,
    @Body() activeUserDto: ActiveUserDto,
  ): Promise<any> {
    const user = await this.authService.findById(_id);

    if (!user) {
      const strErr = 'usuário não encontrado';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    if (user.active) {
      const strErr = 'usuário já está ativo';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    if (user.activationCode !== activeUserDto.activationCode) {
      const strErr = 'código inválido';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    await this.authService.activeUser(_id);

    return { message: 'sucesso' };
  }
}
