import { FilterDto } from '@app/common';
import { BcryptAdapter } from '@app/utils';
import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ActiveUserDto,
  AuthUserDto,
  CreateUserDto,
  RecoverPasswordDto,
  UpdateUserDto,
} from './dtos';
import { UserEntity } from './entities/user';

@Injectable()
export class AuthService {
  private userSelect: any[] = [
    'activationCode',
    'active',
    'created_at',
    'email',
    'id',
    'isFacebook',
    'isGoogle',
    'password',
    'updated_at',
    'username',
  ];

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const rdm = 1000 + Math.random() * 9000;
    const activationCode = Math.floor(rdm).toString();

    const userExists = await this.repository.findOne({
      where: { email: createUserDto.email },
      select: this.userSelect,
    });

    if (userExists)
      throw new ConflictException('e-mail já cadastrado em nosso sistema');

    createUserDto.password = await this.bcryptAdapter.hash(
      createUserDto.password,
    );

    const tempUser = await this.repository.create({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
      activationCode,
    });

    this.mailerService.sendMail({
      to: tempUser.email,
      from: 'sindria@sin-express.com',
      subject: 'Confirmação de conta',
      template: '../templates/email-confirmation',
      context: {
        activationCode: tempUser.activationCode,
      },
    });

    return await this.repository.save(tempUser);
  }

  async createAuth2(createUserDto: CreateUserDto): Promise<string> {
    const foundUser = await this.repository.findOne({
      where: {
        email: createUserDto.email,
      },
      select: this.userSelect,
    });

    if (foundUser) {
      return await this.jwtService.sign({
        email: foundUser.email,
        id: foundUser.id,
      });
    }

    const newUser = await this.repository.create({
      ...createUserDto,
      active: true,
    });

    return await this.jwtService.sign({
      email: newUser.email,
      id: newUser.id,
    });
  }

  async auth(authDto: AuthUserDto): Promise<string> {
    const { email, password } = authDto;

    const user = await this.repository.findOne({
      where: { email },
      select: this.userSelect,
    });

    if (!user) throw new NotFoundException('e-mail não encontrado');

    const match = await this.bcryptAdapter.compare(password, user.password);

    if (!match) throw new UnauthorizedException('credenciais inválidas');

    if (!user.active) {
      this.mailerService.sendMail({
        to: user.email,
        from: 'lich@lichdata.com',
        subject: 'Confirmação de e-mail',
        template: '../templates/email-confirmation',
        context: {
          activationCode: user.activationCode,
        },
      });

      throw new BadRequestException({
        id: user.id,
        active: false
      })
    }

    return await this.jwtService.sign({
      email: user.email,
      id: user.id,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.repository.update(id, updateUserDto);

    return await this.repository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'active'],
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(
    filter: FilterDto,
    createUserDto: CreateUserDto,
  ): Promise<UserEntity[]> {
    const { skip, take } = filter;

    return await this.repository.find({
      skip,
      take,
      ...createUserDto,
    });
  }

  async findOne(value: any): Promise<UserEntity> {
    return await this.repository.findOne({
      where: { ...value },
      select: this.userSelect,
    });
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: { id: id },
      select: this.userSelect,
    });
  }

  async recoverPassword(
    recoverPasswordDto: RecoverPasswordDto,
  ): Promise<any> {
    const user = await this.repository.findOne({
      where: { email: recoverPasswordDto.email },
      select: this.userSelect,
    });


    if (!user) throw new NotFoundException('e-mail não encontrado');

    this.mailerService.sendMail({
      to: recoverPasswordDto.email,
      from: 'lich@lichdata.com',
      subject: 'Recuperação de senha',
      template: '../templates/recover-password',
      context: {
        token: this.jwtService.sign({ id: user.id })
      },
    });

    return true
  }

  async changePassword(id: string, password: string): Promise<any> {
    return await this.repository.update(id, { password: password });
  }

  async activeUser(id: string, activeUserDto: ActiveUserDto): Promise<string> {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('usuário não encontrado');

    if (user.active) throw new BadRequestException('usuário já está ativo');

    if (user.activationCode !== activeUserDto.activationCode)
      throw new BadRequestException('código inválido');

    await this.repository.update(id, { active: true });

    return await this.jwtService.sign({
      email: user.email,
      id: user.id,
    });
  }

  async passportLogin(req): Promise<any> {
    return req.user;
  }

  async resendCode(id: string): Promise<any> {
    const foundUser = await this.findOne({id})

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    this.mailerService.sendMail({
      to: foundUser.email,
      from: 'lich@lichdata.com',
      subject: 'Confirmação de conta',
      template: '../templates/email-confirmation',
      context: {
        activationCode: foundUser.activationCode,
      },
    });

    return {};
  }

}
