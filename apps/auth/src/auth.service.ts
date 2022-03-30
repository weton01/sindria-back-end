import { FilterDto } from '@app/common';
import { BcryptAdapter } from '@app/utils';
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveUserDto, AuthUserDto, CreateUserDto, RecoverPasswordDto, UpdateUserDto } from './dtos';
import { UserEntity } from './entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const rdm = 1000 + Math.random() * 9000;
    const activationCode = Math.floor(rdm).toString();

    const userExists = await this.repository.findOne({
      email: createUserDto.email,
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

    return await this.repository.save(tempUser);
  }

  async createAuth2(createUserDto: CreateUserDto): Promise<string> {
    const foundUser = await this.repository.findOne({ email: createUserDto.email })

    if (foundUser) {
      return await this.jwtService.sign({
        email: foundUser.email,
        id: foundUser.id,
      });
    }

    const newUser = await this.repository.create({
      ...createUserDto,
      active: true
    })

    return await this.jwtService.sign({
      email: newUser.email,
      id: newUser.id,
    })
  }

  async auth(authDto: AuthUserDto): Promise<string> {
    const { email, password } = authDto

    const user = await this.repository.findOne({ email });

    if (!user)
      throw new NotFoundException('e-mail não encontrado');

    const match = await this.bcryptAdapter.compare(password, user.password);

    if (!match)
      throw new UnauthorizedException('credenciais inválidas');


    if (!user.active)
      throw new UnauthorizedException('credenciais inválidas');

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
    return await this.repository.findOne({ ...value });
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.repository.findOne({ id: id });
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto): Promise<string> {
    const user = await this.repository.findOne({
      email: recoverPasswordDto.email,
    });

    if (!user)
      throw new NotFoundException('e-mail não encontrado');

    return this.jwtService.sign({ id: user.id });
  }

  async changePassword(id: string, password: string): Promise<any> {
    return await this.repository.update(id, { password: password });
  }

  async activeUser(id: string, activeUserDto: ActiveUserDto): Promise<string> {
    const user = await this.findById(id);

    if (!user)
      throw new NotFoundException('usuário não encontrado');

    if (user.active)
      throw new BadRequestException('usuário já está ativo');

    if (user.activationCode !== activeUserDto.activationCode)
      throw new BadRequestException('código inválido');

    await this.repository.update(id, { active: true });

    return await this.jwtService.sign({
      email: user.email,
      id: user.id,
    });
  }

  async passportLogin(req): Promise<any> {
    return req.user
  }
}
