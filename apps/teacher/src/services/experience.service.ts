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
import { FilterDto } from '@app/common';

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
    id: string,
    updateExperienceDto: UpdateExperienceDto,
  ): Promise<ExperienceEntity> {
    await this.repository.update(id, updateExperienceDto);
    return await this.repository.findOne({
      where: { id: id },
      relations: ['teacher'],
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(
    filter: FilterDto,
    relations: string[] = [],
  ): Promise<ExperienceEntity[]> {
    const { skip, take } = filter;
    return await this.repository.find({
      skip,
      take,
      relations: relations,
      ...filter,
    });
  }

  async findOne(value: any): Promise<ExperienceEntity> {
    const foundSkills = await this.repository.findOne({
      relations: ['teacher'],
      where: value,
    });
    return foundSkills;
  }

  async findById(id: string): Promise<ExperienceEntity> {
    return await this.repository.findOne({
      where: { id: id },
      relations: ['teacher'],
    });
  }
}
