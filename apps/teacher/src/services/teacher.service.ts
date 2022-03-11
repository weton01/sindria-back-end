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
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity> {
    console.log(1);
    
    await this.repository.update({id: id,}, updateTeacherDto);
    console.log(2);
    return await this.repository.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(
    filterTeacherDto?: FilterTeacherDto,
    params?: any,
  ): Promise<TeacherEntity[]> {
    const teachers = await this.repository.find({
      where: params,
      relations: ['user', 'skills', 'formations'],
      order: { created_at: 'DESC' },
      ...filterTeacherDto,
    });

    return teachers.map((item: TeacherEntity) => {
      if (item.user) {
        delete item.user.password;
        delete item.user.activationCode;
      }
      return item;
    });
  }

  async findOne(value: any): Promise<TeacherEntity> {
    const foundTeacher = await this.repository.findOne({
      relations: ['user', 'skills', 'formations'],
      where: value,
    });
    return foundTeacher;
  }

  async findById(id: string): Promise<TeacherEntity> {
    return await this.repository.findOne({
      where: { id: id },
      relations: ['user', 'skills', 'formations'],
    });
  }
}
