import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto, FilterSkillDto, UpdateSkillDto } from '../dtos'; 
import { SkillEntity } from '../entities';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly repository: Repository<SkillEntity>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<SkillEntity> {
    const tempSkill = await this.repository.create(createSkillDto);
    return await this.repository.save(tempSkill);
  }

  async update(
    id: string,
    updateSkillDto: UpdateSkillDto,
  ): Promise<SkillEntity> {
    await this.repository.update(id, updateSkillDto);
    return await this.repository.findOne({
      where: { id: id },
      relations: ['teacher'],
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(
    filterSkillDto: FilterSkillDto,
    params?: any,
  ): Promise<SkillEntity[]> {
    return await this.repository.find({
      where: params,
      relations: ['teacher', 'teacher.user'],
      order: { created_at: 'DESC' },
      ...filterSkillDto,
    });
  }

  async findOne(value: any): Promise<SkillEntity> {
    const foundSkills = await this.repository.findOne({
      relations: ['teacher',],
      where: value,
    });
    return foundSkills;
  }

  async findById(id: string): Promise<SkillEntity> {
    return await this.repository.findOne({
      where: { id: id },
      relations: ['teacher'],
    });
  }
}
