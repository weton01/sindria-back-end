import { UserEntity } from '@/auth/entities/user';
import { MessageErrors } from '@app/utils/messages';
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create';
import { FindProductDto } from './dtos/find';
import { UpdateProductDto } from './dtos/update';
import { ProductEntity } from './entities/product';
import { InjectS3, S3 } from 'nestjs-s3';
import { v4 as uuid } from 'uuid';
import { envs } from '@app/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectS3() private readonly s3: S3,
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

    await this.repository.save({ ...foundProduct, ...dto });

    return await this.repository.findOne({ where: { id }, relations: ['user', 'categories', 'brand'] });
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

    return await this.repository.findOne({
      where: { id },
      relations: ['user', 'categories', 'brand', 'relations']
    });
  }

  async find(query: FindProductDto, userId: string): Promise<[ProductEntity[], number]> {
    const { skip, take, relations, orderBy, select, where } = query

    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser)
      throw new NotFoundException('usuário não encontrado');

    return await this.repository.findAndCount({
      order: orderBy,
      skip, take, relations, select, where
    });
  }

  async assignUrl(): Promise<any> {
    const key = `${envs.AWS_IMAGES_BUCKET_FOLDER_NAME}/${uuid()}`

    const url = await this.s3.createPresignedPost({
      Bucket: envs.AWS_BUCKER_NAME,
      Conditions: [
        {"acl": "public-read"},
        { 'Content-Type': 'image/webp' },
      ],
      Fields: {
        key: key,
      },
      Expires: 600,
     })
     

    return { get: `https://${envs.AWS_BUCKER_NAME}.s3.amazonaws.com/${key}`, put: url}
  }

}
