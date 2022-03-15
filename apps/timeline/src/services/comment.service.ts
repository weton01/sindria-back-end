import { FilterDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CreateCommentDto } from '../dtos/comments/create-comment.dto';
import { UpdateCommentDto } from '../dtos/comments/update-comment.dto';
import { CommentEntity } from '../entities';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: TreeRepository<CommentEntity>,
  ) {}

  async create(createDto: CreateCommentDto): Promise<CommentEntity> {
    const tempComment = await this.repository.create({
      ...createDto,
    });

    return await this.repository.save(tempComment);
  }

  async save(comment: CommentEntity): Promise<CommentEntity> {
    return await this.repository.save(comment)
  }

  async update(id: string, comment: UpdateCommentDto): Promise<CommentEntity> {
    await this.repository.update(id, comment);

    return await this.repository.findOne({id})
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id)
  }

  async find(filter: FilterDto): Promise<CommentEntity[]> {
    const { skip, take } = filter
    return  await this.repository.find({
      relations: ['replys', 'post', 'user'],
      skip, take,
    })
  }

  async findOne(comment: CommentEntity): Promise<CommentEntity> {
    return await this.repository.findOne({
      where: comment,
      relations: ['replys', 'post', 'user'],
    })
  }

  async findById(id: string): Promise<CommentEntity> {
    return await this.repository.findOne({
      where: {id},
      relations: ['replys', 'post', 'user'],
    })
  }

  async findChildrens(comment: CommentEntity): Promise<CommentEntity[]> {
    return await this.repository.findDescendants(comment)
  }
}
