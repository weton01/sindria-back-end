import { JwtAuthGuard } from '@app/common/guards';

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
import { UserEntity } from './entities/user';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { BcryptAdapter } from '@app/utils/bcrypt/bcrypt';
import { AsaasCreateDigitalCC } from '@app/utils/asaas/inputs/create-digitalcc';
import { AsaasCompanyType } from '@app/utils/asaas/enums/company-type';
import { envs } from '@app/common';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService,
  ) {}

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

    delete user.password;
    delete user.activationCode;

    return user;
  }

  @Post('/signup/admin/:password')
  async signupAdmin(
    @Param('password') password: string,
    @Body() userDto: CreateUserDto,
  ): Promise<any> {
    const dt: AsaasCreateDigitalCC = {
      name: envs.ASAAS_NAME,
      email: envs.ASAAS_EMAIL,
      cpfCnpj: envs.ASAAS_CPFCNPJ,
      companyType: AsaasCompanyType[envs.ASAAS_COMPANY_TYPE],
      birthDate: envs.ASAAS_BIRTHDATE,
      phone: envs.ASAAS_PHONE,
      mobilePhone: envs.ASAAS_MOBILE_PHONE,
      address: envs.ASAAS_ADDRESS,
      addressNumber: envs.ASAAS_ADDRESS_NUMBER,
      complement: envs.ASAAS_COMPLEMENT,
      province: envs.ASAAS_PROVINCE,
      postalCode: envs.ASAAS_POST_CODE,
    };
    const user = await this.authService.createAdmin(password, userDto, dt);

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
    const { token, user } = await this.authService.auth(authDto);

    return { token, user };
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
    await this.authService.recoverPassword(recoverPasswordDto);

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
    const token = await this.authService.activeUser(id, activeUserDto);

    return { token };
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return;
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = await this.authService.passportLogin(req);

    return await {
      token: this.authService.createAuth2(user),
    };
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {
    return;
  }

  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req) {
    const user = await this.authService.passportLogin(req);

    return await {
      token: this.authService.createAuth2(user),
    };
  }

  @Post('/resend-code/:id')
  async resendCodeEmail(@Param('id') id) {
    return await this.authService.resendCode(id);
  }
}
