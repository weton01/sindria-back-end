import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto, FilterTeacherDto, UpdateTeacherDto } from '../dtos';
import { ObjectID } from 'mongodb';
import { TeacherEntity } from '../entities';
import { FilterDto } from '@app/common';

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
    relations: string[] = [],
  ): Promise<TeacherEntity> {  
    await this.repository.update({ id: id }, updateTeacherDto); 
    return await this.repository.findOne({
      where: { id: id },
      relations: relations,
    });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(
    filter?: FilterDto,
     relations: string[] = [],
  ): Promise<TeacherEntity[]> {
    const { skip, take   } = filter;

    const teachers = await this.repository.find({
      skip,
      take,
      relations: relations,
    });

    return teachers.map((item: TeacherEntity) => {
      if (item.user) {
        delete item.user.password;
        delete item.user.activationCode;
      }
      return item;
    });
  }

  async findOne(value: any, relations: string[] = []): Promise<TeacherEntity> {
    const foundTeacher = await this.repository.findOne({
      relations: relations,
      where: value,
    });
    return foundTeacher;
  }

  async findById(id: string, relations: string[] = []): Promise<TeacherEntity> {
    return await this.repository.findOne({
      where: { id: id },
      relations: relations,
    });
  }
}
