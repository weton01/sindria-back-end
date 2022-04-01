import { UserEntity } from '@/auth/entities';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CreateAddressDto } from './dtos/create';
import { UpdateAddressDto } from './dtos/update';
import { AddressEntity } from './entities/address';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly repository: TreeRepository<AddressEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: TreeRepository<UserEntity>
  ) { }

  async create(userId: string, dto: CreateAddressDto): Promise<AddressEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId })

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado')

    const foundAddress = this.repository.findOne({
      street: dto.street,
      number: dto.number,
      city: dto.city,
      neighborhood: dto.neighborhood,
      user: foundUser
    })

    if (foundAddress)
      throw new ConflictException('endereço já existente')

    const tempAddress = await this.repository.create(dto)
    return await this.repository.save(tempAddress)
  }

  async update(id: string, dto: UpdateAddressDto): Promise<AddressEntity> {
    const foundAddress = this.repository.findOne({ id })

    if (foundAddress)
      throw new NotFoundException('endereço não encontrado')

    await this.repository.update(id, dto)
    return await this.repository.findOne({id})
  }

  async delete(id: string): Promise<any> {
    const foundAddress = this.repository.findOne({ id })

    if (foundAddress)
      throw new NotFoundException('endereço não encontrado')

    return await this.repository.delete(id)
  }

  async findOne(query: AddressEntity): Promise<AddressEntity> {
    return this.repository.findOne(query)
  }

  async findById(id: string): Promise<AddressEntity> {
    return this.repository.findOne({id})
  }

  async find(query: AddressEntity): Promise<AddressEntity[]> {
    return this.repository.find(query)
  }
}
