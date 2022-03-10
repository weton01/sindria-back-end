import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { FormationEntity } from '../entities';
import {
  CreateFormationDto,
  FilterFormationDto,
  UpdateFormationDto,
} from '../dtos';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(FormationEntity)
    private readonly repository: Repository<FormationEntity>,
  ) {}

  async create(
    createFormationDto: CreateFormationDto,
  ): Promise<FormationEntity> {
    const tempFormation = await this.repository.create(createFormationDto);
    return await this.repository.save(tempFormation);
  }

  async update(
    id: string,
    updateFormationDto: UpdateFormationDto,
  ): Promise<FormationEntity> {
    await this.repository.update(id, updateFormationDto);
    return await this.repository.findOne({ id });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(
    filterFormationDto: FilterFormationDto,
  ): Promise<FormationEntity[]> {
    return await this.repository.find({
      order: { created_at: 'DESC' },
      ...filterFormationDto,
    });
  }

  async findOne(value: any): Promise<FormationEntity> {
    const foundSkills = await this.repository.findOne({
      order: { created_at: 'DESC' },
      where: value,
    });
    return foundSkills;
  }

  async findById(id: string): Promise<FormationEntity> {
    return await this.repository.findOne({ id: new ObjectID(id) });
  }
}
