import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto, FilterTeacherDto, UpdateTeacherDto } from '../dtos';
import { ObjectID } from 'mongodb';
import { TeacherEntity } from '../entities';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity)
    private readonly repository: Repository<TeacherEntity>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    const tempTeacher = await this.repository.create(createTeacherDto);
    return await this.repository.save(tempTeacher);
  }

  async update(
    _id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    await this.repository.update(_id, updateTeacherDto);
    return await this.repository.findOne({ _id });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(
    filterTeacherDto?: FilterTeacherDto,
    params?: any,
  ): Promise<TeacherEntity[]> {
    return await this.repository.find({
      where: params,
      order: { created_at: 'DESC' },
      ...filterTeacherDto,
     });
  }

  async findOne(value: any): Promise<TeacherEntity> {
    const foundTeacher = await this.repository.findOne({
      order: { created_at: 'DESC' },
      where: value
    }) 
    return foundTeacher;
  }

  async findById(_id: string): Promise<TeacherEntity> {
    return await this.repository.findOne({ _id: new ObjectID(_id) });
  }
}
