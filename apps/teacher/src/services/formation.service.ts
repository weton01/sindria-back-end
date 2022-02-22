 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormationDto, FilterFormationDto, UpdateFormationDto } from '../dtos';
import { ObjectID } from "mongodb" 
import { FormationEntity } from '@app/common';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(FormationEntity)
    private readonly repository: Repository<FormationEntity>,
  ) {}

  async create(createFormationDto: CreateFormationDto): Promise<FormationEntity> {
    const tempFormation = await this.repository.create(createFormationDto);
    return await this.repository.save(tempFormation);
  }

  async update(_id: string, updateFormationDto: UpdateFormationDto): Promise<FormationEntity> {
    await this.repository.update(_id, updateFormationDto);
    return await this.repository.findOne({ _id });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(filterFormationDto: FilterFormationDto): Promise<FormationEntity[]> {
    return await this.repository.find({ order:{ created_at: 'DESC' }, ...filterFormationDto });
  }

  async findOne(value: any): Promise<FormationEntity> { 
    return await this.repository.findOne({  ...value });
  }

  async findById(_id: string): Promise<FormationEntity> {
    return await this.repository.findOne({ _id: new ObjectID(_id) });
  }
}
