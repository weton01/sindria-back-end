import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto, FilterSkillDto, UpdateSkillDto } from '../dtos';
import { ObjectID } from 'mongodb';
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
    _id: string,
    updateSkillDto: UpdateSkillDto,
  ): Promise<SkillEntity> {
    await this.repository.update(_id, updateSkillDto);
    return await this.repository.findOne({ _id });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(filterSkillDto: FilterSkillDto): Promise<SkillEntity[]> {
    return await this.repository.find({
      order: { created_at: 'DESC' },
      ...filterSkillDto,
    });
  }

  async findOne(value: any): Promise<SkillEntity> {
    return await this.repository.findOne({ ...value });
  }

  async findById(_id: string): Promise<SkillEntity> {
    return await this.repository.findOne({ _id: new ObjectID(_id) });
  }
}
