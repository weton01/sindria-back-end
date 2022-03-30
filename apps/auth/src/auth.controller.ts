import { BcryptAdapter } from '@app/utils';
import { JwtAuthGuard } from '@app/utils/guards';
import { MailerService } from '@nestjs-modules/mailer';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  ActiveUserDto,
  CreateUserDto,
  RecoverCallbackDto,
  UpdateUserDto,
} from './dtos';

import { AuthUserDto } from './dtos/auth-user.dto';
import { RecoverPasswordDto } from './dtos/recover-password.dto';
import { UserEntity } from './entities';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) { }

  @ApiCreatedResponse({
    type: UserEntity,
    description: 'Success',
  })
  @ApiConflictResponse({
    description: 'E-mail in use',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.CONFLICT,
        },
        message: {
          type: 'string',
          example: 'e-mail já cadastrado em nosso sistema',
        },
      },
    },
  })
  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto): Promise<any> {
    const user = await this.authService.create({
      ...userDto,
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

    return user;
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'Bearer ...',
        },
      },
    },
    description: 'Success',
  })
  @ApiNotFoundResponse({
    description: 'E-mail not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.NOT_FOUND,
        },
        message: {
          type: 'string',
          example: 'e-mail não encontrado',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.UNAUTHORIZED,
        },
        message: {
          type: 'string',
          example: 'credenciais inválidas',
        },
      },
    },
  })
  @Post('/signin')
  @HttpCode(200)
  async signin(@Body() authDto: AuthUserDto): Promise<any> {
    const token = await this.authService.auth(authDto)
    return { token };
  }

  @ApiOkResponse({
    type: UserEntity,
    description: 'Success',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/update-credentials')
  async update(@Req() req, @Body() updateDto: UpdateUserDto): Promise<any> {
    const { userId } = req.user;
    updateDto.password = await this.bcryptAdapter.hash(updateDto.password);

    const user = await this.authService.update(userId, updateDto);

    return { user };
  }

  @ApiOkResponse({
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'o link de recuperação foi enviado ao seu e-mail',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'E-mail not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.NOT_FOUND,
        },
        message: {
          type: 'string',
          example: 'e-mail não encontrado',
        },
      },
    },
  })
  @HttpCode(200)
  @Post('/recover-password')
  async recoverPassword(
    @Body() recoverPasswordDto: RecoverPasswordDto,
  ): Promise<any> {
 
    const token = this.authService.recoverPassword(recoverPasswordDto)

    this.mailerService.sendMail({
      to: recoverPasswordDto.email,
      from: 'lich@lichdata.com',
      subject: 'Recuperação de senha',
      template: '../templates/recover-password',
      context: {
        token,
      },
    });

    return { message: 'o link de recuperação foi enviado ao seu e-mail' };
  }

  @ApiOkResponse({
    type: UserEntity,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'sucesso',
        },
      },
    },
  })
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

  @ApiOkResponse({
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'Bearer ...',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.NOT_FOUND,
        },
        message: {
          type: 'string',
          example: 'usuário não encontrado',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'User already active or invalid code',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.BAD_REQUEST,
        },
        message: {
          type: 'string',
          example: 'usuário já está ativo | código inválido',
        },
      },
    },
  })
  @Patch('/active-user/:id')
  async activeUser(
    @Param('id') id: string,
    @Body() activeUserDto: ActiveUserDto,
  ): Promise<any> {
    const token = await this.activeUser(id, activeUserDto)

    return { token };
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = await this.authService.passportLogin(req);

    return await {
      token: this.authService.createAuth2(user)
    };
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) { }

  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req) {
    const user = await this.authService.passportLogin(req);

    return await {
      token: this.authService.createAuth2(user)
    };
  }
}
