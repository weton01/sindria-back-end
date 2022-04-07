import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ResendCodeDto } from '../dtos/user/resend-code';
import { User } from '../entities/user';
import { CodeService } from '../services/code';
import { UserService } from '../services/user';
import { SignInDto } from '../dtos/user/signin';
import { SignUpDto } from '../dtos/user/signup';
import { UpdateUserDto } from '../dtos/user/update';
import { JwtAuthGuard } from '../utils/guards';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly codeService: CodeService,
  ) { }

  @ApiCreatedResponse({
    type: User,
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
  async signup(@Body() userDto: SignUpDto): Promise<any> {
    const newUser = await this.userService.create(userDto);

    await this.codeService.create(newUser);

    return newUser;
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
    },
    description: 'Success',
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
          example: 'e-mail não encontrado',
        },
      },
    },
  })
  @Post('/signin')
  @HttpCode(200)
  async signin(@Body() authDto: SignInDto): Promise<any> {
    const { cellphone } = authDto;

    const user = await this.userService.findOne({ cellphone: `+55${cellphone}` });

    if (!user) {
      const strErr = 'usuário não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    if (user.isFacebook) {
      const strErr = 'usuário se cadastrou pelo facebook';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    if (user.isGoogle) {
      const strErr = 'usuário se cadastrou pelo google';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    await this.codeService.create(user);

    return {};
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'any_token',
        },
      },
    },
    description: 'Success',
  })
  @ApiNotFoundResponse({
    description: 'E-mail in use',
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
  @Post('/signin/:code')
  @HttpCode(200)
  async signinCallback(
    @Param('code') code: string,
    @Body() authDto: SignInDto,
  ): Promise<any> {
    const { cellphone } = authDto;

    const foundUser = await this.userService.findOne({ cellphone: `+55${cellphone}` });

    if (!foundUser) {
      const strErr = 'telefone não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    if (foundUser.isFacebook) {
      const strErr = 'usuário se cadastrou pelo facebook';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    if (foundUser.isGoogle) {
      const strErr = 'usuário se cadastrou pelo google';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    const matchCode = await this.codeService.validate(
      foundUser,
      parseFloat(code),
    );

    if (!matchCode) {
      const strErr = 'código inválido';
      throw new HttpException(strErr, HttpStatus.FORBIDDEN);
    }

    if (matchCode.code !== parseFloat(code)) {
      const strErr = 'código inválido';
      throw new HttpException(strErr, HttpStatus.FORBIDDEN);
    }

    if (matchCode.used) {
      const strErr = 'código já utilizado';
      throw new HttpException(strErr, HttpStatus.FORBIDDEN);
    }

    const token = await this.jwtService.sign({
      cellphone: foundUser.cellphone,
      _id: foundUser._id,
    });

    return { token };
  }

  @ApiOkResponse({
    type: User,
    description: 'Success',
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
          example: 'e-mail não encontrado',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/update-credentials')
  async update(@Req() req, @Body() updateDto: UpdateUserDto): Promise<any> {
    const { _id } = req.user;

    const foundUser = await this.userService.findById(_id);

    if (!foundUser) {
      const strErr = 'usuário não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    return await this.userService.update(_id, updateDto);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
    },
    description: 'Success',
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
          example: 'e-mail não encontrado',
        },
      },
    },
  })
  @Post('/resend-code')
  @HttpCode(200)
  async resendCode(@Body() resendCode: ResendCodeDto): Promise<any> {
    const user = await this.userService.findOne({  cellphone: `+55${ resendCode.cellphone}` });

    if (!user) {
      const strErr = 'e-mail não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    await this.codeService.create(user);

    return {};
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return;
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const { email, firstName, lastName } = await this.userService.passportLogin(
      req,
    );

    const foundUser = await this.userService.findOne({ email });

    if (foundUser) {
      return {
        token: await this.jwtService.sign({
          email: foundUser.email,
          _id: foundUser._id,
        }),
      };
    }

    const newUser = await this.userService.create({
      email: email,
      firstName,
      lastName,
      cellphone: '',
      isGoogle: true,
    });

    return await {
      token: this.jwtService.sign({
        email: newUser.email,
        _id: newUser._id,
      }),
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
    const { email, firstName, lastName } = await this.userService.passportLogin(
      req,
    );

    const foundUser = await this.userService.findOne({ email });

    if (foundUser) {
      return await this.jwtService.sign({
        email: foundUser.email,
        _id: foundUser._id,
      });
    }

    const newUser = await this.userService.create({
      email: email,
      firstName,
      lastName,
      cellphone: '',
      isFacebook: true,
    });

    return await {
      token: this.jwtService.sign({
        email: newUser.email,
        _id: newUser._id,
      }),
    };
  }
}
