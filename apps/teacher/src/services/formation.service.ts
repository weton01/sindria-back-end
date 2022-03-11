import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormationEntity } from '../entities';
import {
  CreateFormationDto,
  FilterFormationDto,
  UpdateFormationDto,
} from '../dtos';
import { FilterDto } from '@app/common';

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
  ): Promise<FormationEntity[]> {
    const { skip, take } = filter;
    return await this.repository.find({
      skip,
      take,
      relations: relations,
      ...filter,
    });
  }

  async findOne(value: any): Promise<FormationEntity> {
    const foundSkills = await this.repository.findOne({
      relations: ['teacher'],
      where: value,
    });
    return foundSkills;
  }

  async findById(id: string): Promise<FormationEntity> {
    return await this.repository.findOne({
      where: { id: id },
      relations: ['teacher'],
    });
  }
}
