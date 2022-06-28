import { UserEntity } from '@/auth/entities/user';
import { ProductEntity } from '@/product/entities/product';
import { MessageErrors } from '@app/utils/messages';
import {
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
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(VariationEntity)
    private readonly variationRepository: Repository<VariationEntity>,
  ) { }

  async create(userId: string, productId: string, dto: MutationDto): Promise<any> {
    const ids = dto.variations.map(v => v.id)
    const product = await this.productRepository.findOne({ id: productId })
    let feeTotal: number = 0.0;

    if (!product)
      throw new NotFoundException('produto não encontrado')

    const mutations = await this.repository.find({
      where: {
        product: { id: productId }
      },
      relations: ['variations']
    })

    const foundVariations = await Promise.all(dto.variations.map(item =>
      this.variationRepository.findOne({id: item.id})
    ))

    mutations.forEach((item) => {
      const variations = item.variations.filter(item => ids.includes(item.id))

      if (
        variations.length === dto.variations.length &&
        item.variations.length === variations.length
      )
        throw new ConflictException('mutação já existente')
    })

    foundVariations.forEach(item => {
      feeTotal += item.netAmount
    })

    const tempMutation = this.repository.create({
      ...dto,
      product,
      feeTotal,
      user: { id: userId },
    })

    return await this.repository.save(tempMutation)
  }

  async delete(userId: string, id: string): Promise<any> {
    const [foundUser, foundVariation] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.repository.findOne({
        where: { id },
        relations: ['user'],
      }),
    ]);

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    if (!foundVariation) throw new NotFoundException('mutação não encontrada');

    if (foundVariation.user.id !== userId)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.delete(id);

    return {};
  }
}
