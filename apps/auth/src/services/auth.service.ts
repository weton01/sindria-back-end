import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import { CreateUserDto, UpdateUserDto } from '../dtos';
import { UserEntity } from '../entities';
import { BcryptAdapter } from '@app/utils';
import { FilterDto } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const rdm = 1000 + Math.random() * 9000;
    const activationCode = Math.floor(rdm).toString();

    createUserDto.password = await this.bcryptAdapter.hash(
      createUserDto.password,
    );

    const tempUser = await this.repository.create({
      ...createUserDto,
      activationCode,
    });

    return await this.repository.save(tempUser);
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.repository.update(_id, updateUserDto);

    return await this.repository.findOne({
      where: { _id },
      select: ['_id', 'username', 'email', 'active'],
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(
    filter: FilterDto,
    createUserDto: CreateUserDto,
  ): Promise<UserEntity[]> {
    const { skip, take, order } = filter;

    return await this.repository.find({
      skip,
      take,
      order: {
        created_at: order,
      },
      ...createUserDto,
    });
  }

  async findOne(value: any): Promise<UserEntity> {
    return await this.repository.findOne({ ...value });
  }

  async findById(_id: string): Promise<UserEntity> {
    return await this.repository.findOne({ _id: new ObjectID(_id) });
  }

  async changePassword(_id: string, password: string): Promise<any> {
    return await this.repository.update(_id, { password: password });
  }

  async activeUser(_id: string): Promise<any> {
    return await this.repository.update(_id, { active: true });
  }
}
