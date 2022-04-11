import { UserEntity } from '@/auth/entities/user';
import { MessageErrors } from '@app/utils/messages';
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create';
import { UpdateProductDto } from './dtos/update';
import { ProductEntity } from './entities/product';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(userId: string, dto: CreateProductDto): Promise<ProductEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    const foundProduct = await this.repository.findOne({
      name: dto.name
    });

    if (foundProduct)
      throw new ConflictException('produto com o mesmo nome já cadastrado para o seu usuário');

    const tempProduct = await this.repository.create({
      ...dto,
      user: foundUser
    });
    return await this.repository.save(tempProduct);
  }

  async update(userId: string, id: string, dto: UpdateProductDto): Promise<ProductEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado');

    const foundProduct = await this.repository.findOne({ where: { id }, relations: ['user'] });

    if (!foundProduct)
      throw new NotFoundException('produto não encontrado');

    if (foundProduct.user.id !== foundUser.id)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.update(id, dto);

    return await this.repository.findOne({ id });
  }

  async delete(userId: string, id: string): Promise<any> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado');

    const foundProduct = await this.repository.findOne({ where: { id }, relations: ['user'] });

    if (!foundProduct) throw new NotFoundException('produto não encontrado');

    if (foundProduct.user.id !== foundUser.id)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.delete(id);

    return {}
  }

  async findById(userId: string, id: string): Promise<ProductEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado');

    return await this.repository.findOne({ where: { id }, relations: ['user', 'categories', 'brand'] });
  }

  async find(userId: string): Promise<ProductEntity[]> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado');

    return await this.repository.find({ user: foundUser });
  }
}