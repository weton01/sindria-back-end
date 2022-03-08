import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { ExperienceEntity } from '../entities';
import {
  CreateExperienceDto,
  UpdateExperienceDto,
  FilterExperienceDto,
} from '@/teacher/dtos';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(ExperienceEntity)
    private readonly repository: Repository<ExperienceEntity>,
  ) {}

  async create(
    createExperienceDto: CreateExperienceDto,
  ): Promise<ExperienceEntity> {
    const tempExperience = await this.repository.create(createExperienceDto);
    return await this.repository.save(tempExperience);
  }

  async update(
    _id: string,
    updateExperienceDto: UpdateExperienceDto,
  ): Promise<ExperienceEntity> {
    await this.repository.update(_id, updateExperienceDto);
    return await this.repository.findOne({ _id });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(
    filterExperienceDto: FilterExperienceDto,
  ): Promise<ExperienceEntity[]> {
    return await this.repository.find({
      order: { created_at: 'DESC' },
      ...filterExperienceDto,
    });
  }

  async findOne(value: any): Promise<ExperienceEntity> {
    const foundSkills = await this.repository.findOne({
      order: { created_at: 'DESC' },
      where: value,
    });
    return foundSkills;
  }

  async findById(_id: string): Promise<ExperienceEntity> {
    return await this.repository.findOne({ _id: new ObjectID(_id) });
  }
}
