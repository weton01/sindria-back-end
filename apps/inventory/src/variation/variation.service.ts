import { UserEntity } from '@/auth/entities/user';
import { ProductEntity } from '@/product/entities/product';
import { VariationTypes } from '@app/common/enums/variation-type';
import { MessageErrors } from '@app/utils/messages';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVariationColorDto } from './dtos/create-color';
import { CreateVariationDefaultDto } from './dtos/create-default';
import { CreateVariationSizeDto } from './dtos/create-size';
import { UpdateVariationColorDto } from './dtos/update-color';
import { UpdateVariationDefaultDto } from './dtos/update-default';
import { UpdateVariationSizeDto } from './dtos/update-size';
import { VariationEntity } from './entities/variation';

@Injectable()
export class VariationsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(VariationEntity)
    private readonly repository: Repository<VariationEntity>,
  ) {}

  async createDefault(
    userId: string,
    productId: string,
    dto: CreateVariationDefaultDto,
  ): Promise<VariationEntity> {
    const [foundUser, foundProduct, foundVariation] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.productRepository.findOne({
        where: { id: productId },
        relations: ['user'],
      }),
      this.repository.findOne({
        where: { name: dto.name, product: { id: productId } },
      }),
    ]);

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    if (!foundProduct) throw new NotFoundException('produto não encontrado');

    if (foundVariation) throw new ConflictException('tipo já cadastrado');

    if (foundProduct.user.id !== userId)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    const tempVariation = await this.repository.create({
      ...dto,
      product: foundProduct,
      type: VariationTypes.default,
    });

    return await this.repository.save(tempVariation);
  }

  async createSize(
    userId: string,
    productId: string,
    dto: CreateVariationSizeDto,
  ): Promise<VariationEntity> {
    const [foundUser, foundProduct, foundVariation] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.productRepository.findOne({
        where: { id: productId },
        relations: ['user'],
      }),
      this.repository.findOne({
        where: { size: dto.size, product: { id: productId } },
      }),
    ]);

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    if (!foundProduct) throw new NotFoundException('produto não encontrado');

    if (foundVariation) throw new ConflictException('tamanho já cadastrado');

    if (foundProduct.user.id !== userId)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    const tempVariation = await this.repository.create({
      ...dto,
      product: foundProduct,
      type: VariationTypes.size,
    });

    return await this.repository.save(tempVariation);
  }

  async createColor(
    userId: string,
    productId: string,
    dto: CreateVariationColorDto,
  ): Promise<VariationEntity> {
    const [foundUser, foundProduct, foundVariation] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.productRepository.findOne({
        where: { id: productId },
        relations: ['user'],
      }),
      this.repository.findOne({
        where: { color: dto.color, product: { id: productId } },
      }),
    ]);

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    if (!foundProduct) throw new NotFoundException('produto não encontrado');

    if (foundVariation) throw new ConflictException('cor já cadastrada');

    if (foundProduct.user.id !== userId)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    const tempVariation = await this.repository.create({
      ...dto,
      product: foundProduct,
      type: VariationTypes.color,
    });

    return await this.repository.save(tempVariation);
  }

  async updateDefault(
    userId: string,
    id: string,
    dto: UpdateVariationDefaultDto,
  ): Promise<VariationEntity> {
    const [foundUser, foundVariation] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.repository.findOne({
        where: { id },
        relations: ['product', 'product.user'],
      }),
    ]);

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    if (!foundVariation) throw new NotFoundException('tipo não encontrado');

    if (foundVariation.product.user.id !== userId)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.update(id, dto);

    return await this.repository.findOne({ id });
  }

  async updateSize(
    userId: string,
    id: string,
    dto: UpdateVariationSizeDto,
  ): Promise<VariationEntity> {
    const [foundUser, foundVariation] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.repository.findOne({
        where: { id },
        relations: ['product', 'product.user'],
      }),
    ]);

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    if (!foundVariation) throw new NotFoundException('tamanho não encontrado');

    if (foundVariation.product.user.id !== userId)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.update(id, dto);

    return await this.repository.findOne({ id });
  }

  async updateColor(
    userId: string,
    id: string,
    dto: UpdateVariationColorDto,
  ): Promise<VariationEntity> {
    const [foundUser, foundVariation] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.repository.findOne({
        where: { id },
        relations: ['product', 'product.user'],
      }),
    ]);

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    if (!foundVariation) throw new NotFoundException('cor não encontrada');

    if (foundVariation.product.user.id !== userId)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.update(id, dto);

    return await this.repository.findOne({ id });
  }

  async delete(userId: string, id: string): Promise<any> {
    const [foundUser, foundVariation] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.repository.findOne({
        where: { id },
        relations: ['product', 'product.user'],
      }),
    ]);

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    if (!foundVariation) throw new NotFoundException('variação não encontrada');

    if (foundVariation.product.user.id !== userId)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.delete(id);

    return {};
  }
}
