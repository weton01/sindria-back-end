import { UserEntity } from '@/auth/entities/user';
import { UserTypes } from '@app/common';
import { MessageErrors } from '@app/common/messages';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindTagDto } from './dtos/find';
import { TagDto } from './dtos/tag';
import { TagEntity } from './entities/tag';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly repository: Repository<TagEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userId: string, dto: TagDto): Promise<TagEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });
    if (!foundUser) throw new NotFoundException(MessageErrors.userNotFound);

    if (foundUser.type !== UserTypes.admin)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    const foundTag = await this.repository.findOne({
      name: dto.name,
    });

    if (foundTag) throw new ConflictException('tag já existente');

    const tempTag = await this.repository.create(dto);
    return await this.repository.save(tempTag);
  }

  async delete(userId: string, id: string): Promise<any> {
    const [foundTag, foundUser] = await Promise.all([
      this.repository.findOne({ id }),
      this.userRepository.findOne({ id: userId }),
    ]);

    if (foundUser.type !== UserTypes.admin)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    if (!foundTag) throw new NotFoundException('tag não encontrado');

    return await this.repository.delete(id);
  }

  async findById(id: string): Promise<TagEntity> {
    return this.repository.findOne({ id });
  }

  async find(query: FindTagDto): Promise<[TagEntity[], number]> {
    const { skip, take, relations, orderBy, select, where } = query;

    return await this.repository.findAndCount({
      order: { created_at: orderBy },
      skip,
      take,
      relations,
      select,
      where,
    });
  }
}
