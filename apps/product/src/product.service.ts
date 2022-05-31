import { UserEntity } from '@/auth/entities/user';
import { MessageErrors } from '@app/utils/messages';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { CreateProductDto } from './dtos/create';
import { FindProductDto } from './dtos/find';
import { UpdateProductDto } from './dtos/update';
import { ProductEntity } from './entities/product';
import { InjectS3, S3 } from 'nestjs-s3';
import { v4 as uuid } from 'uuid';
import { envs } from '@app/common';
import { CategoryEntity } from '@/category/entities/category';
import { OrderProductEntity } from '@/order/entities/order-product';
import { ReviewEntity } from '@/review/entities/review';

@Injectable()
export class ProductService {
  constructor(
    @InjectS3() private readonly s3: S3,
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: TreeRepository<CategoryEntity>,
    @InjectRepository(OrderProductEntity)
    private readonly orderProductRepository: Repository<OrderProductEntity>,
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  async create(userId: string, dto: CreateProductDto): Promise<ProductEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    const momCategories = await Promise.all(
      dto.categories.map((category) =>
        this.categoryRepository.findAncestors(category),
      ),
    );

    const foundProduct = await this.repository.findOne({
      name: dto.name,
    });

    if (foundProduct)
      throw new ConflictException(
        'produto com o mesmo nome já cadastrado para o seu usuário',
      );

    const tempProduct = await this.repository.create({
      ...dto,
      user: foundUser,
      momCategories: momCategories.map((item) => item[1]),
    });

    return await this.repository.save(tempProduct);
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    const foundProduct = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!foundProduct) throw new NotFoundException('produto não encontrado');

    if (foundProduct.user.id !== foundUser.id)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.save({ ...foundProduct, ...dto });

    return await this.repository.findOne({
      where: { id },
      relations: ['user', 'categories', 'brand'],
    });
  }

  async delete(userId: string, id: string): Promise<any> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    const foundProduct = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!foundProduct) throw new NotFoundException('produto não encontrado');

    if (foundProduct.user.id !== foundUser.id)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    await this.repository.delete(id);

    return {};
  }

  async findOnCreation(id: string): Promise<ProductEntity> {
    const foundUser = await this.userRepository.findOne();

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    return await this.repository.findOne({
      where: { id },
      relations: [
        'variations',
        'user',
        'mutations',
      ],
    });
  }

  async findById(id: string): Promise<ProductEntity> {
    const foundUser = await this.userRepository.findOne();

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    return await this.repository.findOne({
      where: { id },
      relations: [
        'variations',
        'tags',
        'user',
        'categories',
        'brand', 
        'mutations'
      ],
    });
  }

  async find(query: FindProductDto): Promise<[ProductEntity[], number]> {
    const { skip, take, relations, orderBy, select, where } = query;

    return await this.repository.findAndCount({
      order: orderBy,
      skip,
      take,
      relations,
      select,
      where,
    });
  }
  
  async findHome(): Promise<any> {
    const [bestSalers, bestBrands, bestCategories, bestReviews] =
      await Promise.all([
        this.orderProductRepository
          .createQueryBuilder('obp')
          .select([
            'SUM(obp.quantity) as salesQuantity',
            'obp.productId',
            'p.name',
            'p.id',
            'p.images',
            'p.netAmount',
            'p.grossAmount',
          ])
          .leftJoin('obp.product', 'p')
          .where(`obp.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`)
          .andWhere(`obp.created_at <= NOW()`)
          .groupBy('obp.productId')
          .limit(10)
          .getRawMany(),

        this.orderProductRepository
          .createQueryBuilder('obp')
          .select([
            'SUM(obp.quantity) as salesQuantity',
            'b.name',
            'b.id',
            'b.image',
          ])
          .leftJoin('obp.brand', 'b')
          .where(`obp.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`)
          .andWhere(`obp.created_at <= NOW()`)
          .groupBy('obp.brandId')
          .limit(2)
          .getRawMany(),

        this.orderProductRepository
          .createQueryBuilder('obp')
          .select([
            'SUM(obp.quantity) as salesQuantity',
            'c.name',
            'c.id',
            'c.image',
          ])
          .leftJoin('obp.categories', 'c')
          .where(`obp.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`)
          .andWhere(`obp.created_at <= NOW()`)
          .groupBy('c.id')
          .limit(6)
          .getRawMany(),

        this.reviewRepository
          .createQueryBuilder('r')
          .select([
            'AVG(r.rating) as rate',
            'COUNT(r.id) as qtd',
            'p.name',
            'p.id',
            'p.images',
            'p.netAmount',
            'p.grossAmount',
          ])
          .leftJoin('r.orderProduct', 'obp')
          .leftJoin('r.product', 'p')
          .where(`obp.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`)
          .andWhere(`obp.created_at <= NOW()`)
          .groupBy('r.productId')
          .limit(6)
          .getRawMany(),
      ]);

    return {
      bestSalers,
      bestBrands,
      bestCategories,
      bestReviews,
    };
  }

  async findNavbar(name: string, params: any): Promise<ProductEntity[]> {
    name = name
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

    if (params.category)
      return await this.repository
        .createQueryBuilder('p')
        .select(['p.id', 'p.name'])
        .distinctOn(['p.name'])
        .leftJoin('p.momCategories', 'c')
        .where(`p.name LIKE '%${name}%'`)
        .andWhere(`c.id = :category`, { category: params.category })
        .take(5)
        .getMany();

    return await this.repository
      .createQueryBuilder('p')
      .select(['p.id', 'p.name'])
      .distinctOn(['p.name'])
      .where(`p.name LIKE '%${name}%'`)
      .take(5)
      .getMany();
  }

  async assignUrl(): Promise<any> {
    const key = `${envs.AWS_IMAGES_BUCKET_FOLDER_NAME}/${uuid()}`;

    const url = await this.s3.createPresignedPost({
      Bucket: envs.AWS_BUCKER_NAME,
      Conditions: [{ acl: 'public-read' }, { 'Content-Type': 'image/webp' }],
      Fields: {
        key: key,
      },
      Expires: 600,
    });

    return {
      get: `https://${envs.AWS_BUCKER_NAME}.s3.amazonaws.com/${key}`,
      put: url,
    };
  }
}
