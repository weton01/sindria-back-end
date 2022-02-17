import { UserEntity } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const tempUser = await this.repository.create(createUserDto);
    return await this.repository.save(tempUser);
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.repository.update(_id, updateUserDto);
    return await this.repository.findOne({ _id });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(findEstablishmentDto: any): Promise<UserEntity[]> {
    const { limit, offset } = findEstablishmentDto;
    return await this.repository.find({
      skip: limit,
      take: offset,
    });
  }

  async findOne(value: any): Promise<UserEntity> {
    return await this.repository.findOne({ ...value });
  }

  async findById(_id: string): Promise<UserEntity> {
    return await this.repository.findOne({ _id });
  }
}
