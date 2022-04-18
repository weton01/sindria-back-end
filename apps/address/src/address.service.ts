import { UserEntity } from '@/auth/entities/user';
import { MessageErrors } from '@app/utils/messages';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/create';
import { UpdateAddressDto } from './dtos/update';
import { AddressEntity } from './entities/address';
import { FindAddressDto } from './dtos/find';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly repository: Repository<AddressEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(userId: string, dto: CreateAddressDto): Promise<AddressEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    const foundAddress = await this.repository.findOne({
      street: dto.street,
      number: dto.number,
      user: foundUser,
    });

    if (foundAddress) throw new ConflictException('endereço já existente');

    const tempAddress = await this.repository.create({
      ...dto,
      user: foundUser
    });
    return await this.repository.save(tempAddress);
  }

  async update(userId: string, id: string, dto: UpdateAddressDto): Promise<AddressEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado');

    const foundAddress = await this.repository.findOne({ where: { id }, relations: ['user'] });

    if (!foundAddress)
      throw new NotFoundException('endereço não encontrado');

    if (foundAddress.user.id !== foundUser.id)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.update(id, dto);

    return await this.repository.findOne({ id });
  }

  async delete(userId: string, id: string): Promise<any> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado');

    const foundAddress = await this.repository.findOne({ where: { id }, relations: ['user'] });

    if (!foundAddress) throw new NotFoundException('endereço não encontrado');

    if (foundAddress.user.id !== foundUser.id)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.delete(id);

    return {}
  }

  async findById(userId: string, id: string): Promise<AddressEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado');

    const foundAddress = await this.repository.findOne({ where: { id }, relations: ['user'] });

    if (foundAddress.user.id !== foundUser.id)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    return foundAddress
  }

  async find(query: FindAddressDto, userId: string): Promise<[AddressEntity[], number]> {
    const { skip, take, relations, orderBy, select, where } = query

    const user = await this.userRepository.findOne({ id: userId });

    if (!user)
      throw new NotFoundException('usuário não encontrado');

    return await this.repository.findAndCount({
      where: { ...where, user },
      order: { created_at: orderBy },
      skip, take, relations, select
    });
  }
}
