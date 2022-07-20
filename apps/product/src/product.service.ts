import { UserEntity } from '@/auth/entities/user';
import { MessageErrors } from '@app/common/messages';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, TreeRepository } from 'typeorm';
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

  private formatQueryString(
    prefix: string,
    str: string[],
    operator: string,
  ): string {
    let newStr = ``;

    str.forEach((s, index) => {
      if (index === 0) newStr += `${prefix} = '${s}'`;
      else newStr += `${operator} ${prefix} = '${s}'`;
    });

    return newStr;
  }

  private formatQueryArray(str: string[]): string {
    let newStr = ``;

    str.forEach((s, index) => {
      if (index === 0 || !newStr) newStr += `${s}`;
      else {
        if (s) newStr += `AND ${s}`;
      }
    });

    return newStr;
  }

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
    return await this.repository.findOne({
      where: { id },
      relations: ['variations', 'user', 'mutations'],
    });
  }

  async findById(id: string): Promise<any> {
    const product = await this.repository.findOne({
      where: { id },
      relations: [
        'variations',
        'tags',
        'user',
        'categories',
        'brand',
        'mutations',
        'mutations.variations',
      ],
    });

    const splice = product.name.split(' ')[0];

    const [bestSalersRelated, foundOrderProduct] = await Promise.all([
      this.repository.find({
        where: { name: Like(`%${splice}%`) },
        order: { salesQuantity: 'DESC' },
        relations: ['mutations', 'mutations.variations', 'user'],
        skip: 0,
        take: 3,
      }),
      this.orderProductRepository.findOne({
        where: { product },
        relations: [
          'orderStore',
          'orderStore.orderProducts',
          'orderStore.orderProducts.product',
          'orderStore.orderProducts.product.user',
          'orderStore.orderProducts.mutation',
          'orderStore.orderProducts.mutation.variations',
        ],
      }),
    ]);

    let relatedProducts;

    if (!foundOrderProduct) {
      relatedProducts = [];
    } else {
      if (!foundOrderProduct.orderStore) {
        relatedProducts = [];
      } else {
        if (!foundOrderProduct.orderStore.orderProducts) {
          relatedProducts = [];
        } else {
          relatedProducts = foundOrderProduct.orderStore.orderProducts;
        }
      }
    }

    return {
      product,
      bestSalersRelated,
      relatedProducts,
    };
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

  async filter(query: FindProductDto): Promise<[ProductEntity[], number, any]> {
    const { skip, take, orderBy, where } = query;
    const qParams = new URLSearchParams(where);

    const hasName = qParams.has('p.name');
    const hasMinAmount = qParams.has('p.minAmount');
    const hasMaxAmount = qParams.has('p.maxAmount');
    const hasCategories = qParams.has('p.category');
    const hasTags = qParams.has('p.tag');
    const hasVariations = qParams.has('p.variation');
    const hasBrands = qParams.has('p.brand');

    const newQueryArray = [
      hasCategories
        ? this.formatQueryString('c.id', qParams.getAll('p.category'), 'OR')
        : ``,
      hasTags
        ? this.formatQueryString('t.id', qParams.getAll('p.tag'), 'OR')
        : ``,
      hasVariations
        ? this.formatQueryString('v.id', qParams.getAll('p.variation'), 'OR')
        : ``,
      hasBrands
        ? this.formatQueryString('b.id', qParams.getAll('p.brand'), 'OR')
        : ``,
      hasName ? `p.name LIKE '%${qParams.get('p.name')}%'` : ``,
      hasMinAmount && hasMaxAmount
        ? `p.netAmount >= ${qParams.get('p.minAmount')} AND 
        p.netAmount <= ${qParams.get('p.maxAmount')}`
        : ``,
    ];

    const productQuery = [
      hasCategories
        ? this.formatQueryString(
            'ProductEntity_ProductEntity__categories.categoriesId',
            qParams.getAll('p.category'),
            'OR',
          )
        : ``,
      hasTags
        ? this.formatQueryString(
            'ProductEntity_ProductEntity__tags.tagsId',
            qParams.getAll('p.tag'),
            'OR',
          )
        : ``,
      hasVariations
        ? this.formatQueryString(
            'ProductEntity__variations.id',
            qParams.getAll('p.variation'),
            'OR',
          )
        : ``,
      hasBrands
        ? this.formatQueryString(
            'ProductEntity__brand.id',
            qParams.getAll('p.brand'),
            'OR',
          )
        : ``,
      hasName ? `ProductEntity.name LIKE '%${qParams.get('p.name')}%'` : ``,
      hasMinAmount && hasMaxAmount
        ? `ProductEntity.netAmount >= ${qParams.get(
            'p.minAmount',
          )} AND  ProductEntity.netAmount <= ${qParams.get('p.maxAmount')}`
        : ``,
    ];

    const [products, minMax, categories, tags, sizes, brands] =
      await Promise.all([
        this.repository.findAndCount({
          where: (qb) => {
            qb.where(this.formatQueryArray(productQuery));
          },
          skip,
          take,
          order: orderBy,
          relations: ['categories', 'tags', 'brand', 'variations'],
        }),
        this.repository
          .createQueryBuilder('p')
          .select([
            'MIN(p.netAmount) as minAmount',
            'MAX(p.netAmount) as maxAmount',
          ])
          .leftJoin('p.categories', 'c')
          .leftJoin('p.tags', 't')
          .leftJoin('p.brand', 'b')
          .leftJoin('p.variations', 'v')
          .where(this.formatQueryArray(newQueryArray))
          .getRawMany(),
        this.categoryRepository
          .createQueryBuilder('c')
          .select(['c.name', 'p.id'])
          .leftJoin('c.products', 'p')
          .leftJoin('p.tags', 't')
          .leftJoin('p.brand', 'b')
          .leftJoin('p.variations', 'v')
          .where(this.formatQueryArray(newQueryArray))
          .groupBy('c.id')
          .getRawMany(),
        this.repository
          .createQueryBuilder('p')
          .select(['t.id', 't.name'])
          .leftJoin('p.categories', 'c')
          .leftJoin('p.tags', 't')
          .leftJoin('p.brand', 'b')
          .leftJoin('p.variations', 'v')
          .where(this.formatQueryArray(newQueryArray))
          .groupBy('t.id')
          .getRawMany(),
        this.repository
          .createQueryBuilder('p')
          .select(['v.id', 'v.size'])
          .leftJoin('p.categories', 'c')
          .leftJoin('p.tags', 't')
          .leftJoin('p.brand', 'b')
          .leftJoin('p.variations', 'v')
          .where(this.formatQueryArray(newQueryArray))
          .andWhere("v.type = 'size'")
          .groupBy('v.id')
          .getRawMany(),
        this.repository
          .createQueryBuilder('p')
          .select(['b.id', 'b.name'])
          .leftJoin('p.categories', 'c')
          .leftJoin('p.tags', 't')
          .leftJoin('p.brand', 'b')
          .leftJoin('p.variations', 'v')
          .where(this.formatQueryArray(newQueryArray))
          .groupBy('b.id')
          .getRawMany(),
      ]);

    return [
      products[0],
      products[1],
      { filter: { minMax, categories, tags, sizes, brands } },
    ];
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
