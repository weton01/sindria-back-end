import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, TreeRepository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create';
import { CreateSubCategoryDto } from './dtos/create-sub';
import { UpdatetegoryDto } from './dtos/update';
import { CategoryEntity } from './entities/category';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: TreeRepository<CategoryEntity>
  ) { }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const foundCategory = await this.repository.findOne({ name: dto.name })

    if (foundCategory)
      throw new ConflictException('categoria já existente')


    const newCategory = await this.repository.create(dto)

    return await this.repository.save(newCategory)
  }

  async createSub(id: string, dto: CreateSubCategoryDto): Promise<CategoryEntity> {
    const [foundSub, parent] = await Promise.all([
      this.repository.findOne({ name: dto.name }),
      this.repository.findOne({ id })
    ])

    if (foundSub)
      throw new ConflictException('categoria já existente')

    if (!parent)
      throw new NotFoundException('categoria não encontrada')

    const newCategory = await this.repository.create({
      ...dto,
      parent
    })

    return await this.repository.save(newCategory)
  }

  async find(): Promise<CategoryEntity[]> {
    return await this.repository.findTrees();
  }

  async update(id: string, dto: UpdatetegoryDto): Promise<CategoryEntity> {
    const foundCategory = this.repository.findOne({ id })

    if (foundCategory)
      throw new NotFoundException('categoria não encontrada')

    await this.repository.update(id, dto)
    return await this.repository.findOne({ id });
  }

  async delete(id: string): Promise<any> {
    const foundCategory = this.repository.findOne({ id })

    if (foundCategory)
      throw new NotFoundException('categoria não encontrada')

    return await this.repository.delete(id);
  }

  async findById(id: string): Promise<CategoryEntity> {
    return this.repository.findOne({ id })
  }
}
