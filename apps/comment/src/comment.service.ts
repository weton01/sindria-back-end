import { UserEntity } from '@/auth/entities/user';
import { ProductEntity } from '@/product/entities/product';
import { MessageErrors } from '@app/utils/messages';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/create';
import { CommentEntity } from './entities/comment';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) { }

  async create(productId: string, userId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    const [foundProduct, foundUser] = await Promise.all([
      this.productRepository.findOne({ id: productId }),
      this.userRepository.findOne({ id: userId })
    ])

    if (!foundUser)
      throw new NotFoundException(MessageErrors.userNotFound);

    if (!foundProduct)
      throw new NotFoundException("produto não encontrado")

    const tempBrand = await this.repository.create({
      ...dto,
      user: foundUser,
      product: foundProduct
    });

    return await this.repository.save(tempBrand);
  }

  async reply(commentId: string, userId: string, dto: CreateCommentDto): Promise<CommentEntity> {
    const [foundComment, foundUser] = await Promise.all([
      this.repository.findOne({ id: commentId }),
      this.userRepository.findOne({ id: userId })
    ])

    if (!foundComment)
      throw new NotFoundException('comentário não encontrado');

    if (!foundUser)
      throw new NotFoundException(MessageErrors.userNotFound);

    const tempBrand = await this.repository.create({
      ...dto,
      user: foundUser,
      parent: foundComment
    });

    return await this.repository.save(tempBrand);
  }

  async delete(userId: string, id: string): Promise<any> {
    const [foundComment, foundUser] = await Promise.all([
      this.repository.findOne({ where: { id }, relations: ['user'] }),
      this.userRepository.findOne({ id: userId })
    ])

    if (foundComment.user.id !== foundUser.id)
      throw new ForbiddenException(MessageErrors.forbidenToAccess)

    if (!foundComment)
      throw new NotFoundException('comentário não encontrado');

    await this.repository.delete(id);
    return {}
  }
}
