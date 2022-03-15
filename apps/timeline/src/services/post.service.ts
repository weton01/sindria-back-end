import { FilterDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/post/create-post.dto';
import { UpdatePostDto } from '../dtos/post/update-post.dto';
import { PostEntity } from '../entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: Repository<PostEntity>,
  ) { }

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const tempPost = await this.repository.create({
      ...createPostDto,
    });

    return await this.repository.save(tempPost);
  }

  async save(post: PostEntity): Promise<PostEntity> {
    return await this.repository.save(post);
  }

  async update(id: string, toUpdate: UpdatePostDto): Promise<PostEntity> {
    await this.repository.update(id, toUpdate);

    return await this.repository.findOne({ id });
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async find(filter: FilterDto): Promise<PostEntity[]> {
    const { take, skip } = filter;
    return await this.repository.find({
      take,
      skip,
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findOne(params: PostEntity): Promise<PostEntity> {
    return await this.repository.findOne({
      where: params,
    });
  }

  async findById(id: string): Promise<PostEntity> {
    return await this.repository.findOne({
    
      where: { id },
    });
  }
}
