import { UserEntity } from '@/auth/entities/user';
import { VariationTypes } from '@app/common/enums/variation-type';
import { MessageErrors } from '@app/utils/messages';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VariationEntity } from '../variation/entities/variation';
import { MutationDto } from './dtos/mutation';
import { MutationEntity } from './entities/mutation';

@Injectable()
export class MutationService {
  constructor(
    @InjectRepository(MutationEntity)
    private readonly repository: Repository<MutationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(VariationEntity)
    private readonly variationRepository: Repository<VariationEntity>,
  ) { }

  async create(productId: string, dto: MutationDto): Promise<MutationEntity> {
    const [mutations, variations] = await Promise.all([
      this.repository.find({
        where: {
          product: { id: productId },
        },
        relations: ['variations', 'product'],
      }),
      this.variationRepository.find({
        where: [
          { id: dto.color.id },
          { id: dto.size.id },
          { id: dto.variation.id },
        ],
      }),
    ]);

    const colorsCount = variations.filter(
      (v) => v.type === VariationTypes.color,
    );
    const sizesCount = variations.filter(
      (v) => v.type === VariationTypes.size
    );
    const variationsCount = variations.filter(
      (v) => v.type === VariationTypes.default,
    );

    if (
      colorsCount.length > 1 ||
      sizesCount.length > 1 ||
      variationsCount.length > 1
    )
      throw new BadRequestException('você mandou tipos repiditos');

    mutations.forEach((element) => {
      const color = element.variations.find(
        (v) => dto.color.id === v.id
      );

      const size = element.variations.find(
        (v) => dto.size.id === v.id
      );

      const variation = element.variations.find(
        (v) => dto.variation.id === v.id,
      );

      if (color && size && variation)
        throw new ConflictException('mutação de produto já cadastrada');
    });

    const tempMutation = this.repository.create({
      stock: dto.stock,
      variations: variations,
      product: { id: productId }
    });
    return await this.repository.save(tempMutation);
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

    if (!foundVariation) throw new NotFoundException('mutação não encontrada');

    if (foundVariation.product.user.id !== userId)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.delete(id);

    return {};
  }
}
