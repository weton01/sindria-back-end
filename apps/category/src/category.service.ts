import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository, IsNull, Not } from 'typeorm';
import { CreateCategoryDto } from './dtos/create';
import { CreateSubCategoryDto } from './dtos/create-sub';
import { FindCategoryDto } from './dtos/find';
import { UpdatetegoryDto } from './dtos/update';
import { CategoryEntity } from './entities/category';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: TreeRepository<CategoryEntity>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const foundCategory = await this.repository.findOne({ name: dto.name });

    if (foundCategory) throw new ConflictException('categoria já existente');

    const newCategory = await this.repository.create(dto);

    return await this.repository.save(newCategory);
  }

  async createSub(
    id: string,
    dto: CreateSubCategoryDto,
  ): Promise<CategoryEntity> {
    const [foundSub, parent] = await Promise.all([
      this.repository.findOne({ name: dto.name, parent: { id } }),
      this.repository.findOne({ id, parent: null }),
    ]);

    if (!parent)
      throw new NotFoundException('categoria não encontrada ou inválida');

    if (foundSub)
      throw new ConflictException(
        'sub-categoria já cadastrada para essa categoria',
      );

    const newCategory = await this.repository.create({
      ...dto,
      parent,
    });

    return await this.repository.save(newCategory);
  }

  async update(id: string, dto: UpdatetegoryDto): Promise<CategoryEntity> {
    const foundCategory = await this.repository.findOne({ id, parent: null });

    if (!foundCategory)
      throw new NotFoundException('categoria não encontrada ou inválida');

    await this.repository.update(id, dto);
    return await this.repository.findOne({ id });
  }

  async updateSub(id: string, dto: UpdatetegoryDto): Promise<CategoryEntity> {
    const foundSub = await this.repository
      .createQueryBuilder()
      .where(`(id = :id) AND (parentId IS NOT NULL)`, { id })
      .getOne();

    if (!foundSub)
      throw new NotFoundException(
        'sub-categoria não encontrada ou não é uma sub-categoria',
      );

    if (!dto.groupName)
      throw new NotFoundException('sub-categoria precisa de groupName');

    await this.repository.update(id, dto);
    return await this.repository.findOne({ id });
  }

  async delete(id: string): Promise<any> {
    const foundCategory = this.repository.findOne({ id });

    if (!foundCategory) throw new NotFoundException('categoria não encontrada');

    await this.repository.delete(id);

    return {};
  }

  async findById(id: string): Promise<CategoryEntity> {
    return await this.repository.findOne({ where: { id } });
  }

  async find(): Promise<CategoryEntity[]> {
    return await this.repository.findTrees();
  }

  async findCategories(
    query: FindCategoryDto,
  ): Promise<[CategoryEntity[], number]> {
    const { skip, take, relations, orderBy, select } = query;

    return await this.repository.findAndCount({
      where: { parent: null },
      order: { created_at: orderBy },
      skip,
      take,
      relations,
      select,
    });
  }

  async findSubCategories(
    query: FindCategoryDto,
  ): Promise<[CategoryEntity[], number]> {
    const { skip, take, relations, orderBy, select } = query;

    return await this.repository.findAndCount({
      where: { parent: Not(IsNull()) },
      order: { created_at: orderBy },
      skip,
      take,
      relations,
      select,
    });
  }
}
