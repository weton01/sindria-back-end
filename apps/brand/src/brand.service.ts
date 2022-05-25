import { UserEntity } from '@/auth/entities/user';
import { UserTypes } from '@app/common';
import { MessageErrors } from '@app/utils/messages';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dtos/create';
import { FindBrandDto } from './dtos/find';
import { UpdateBrandDto } from './dtos/update';
import { BrandEntity } from './entities/brand';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly repository: Repository<BrandEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userId: string, dto: CreateBrandDto): Promise<BrandEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser) throw new NotFoundException(MessageErrors.userNotFound);

    if (foundUser.type !== UserTypes.admin)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    const foundBrand = await this.repository.findOne({
      name: dto.name,
    });

    if (foundBrand) throw new ConflictException('marca já existente');

    const tempBrand = await this.repository.create(dto);
    return await this.repository.save(tempBrand);
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateBrandDto,
  ): Promise<BrandEntity> {
    const [tempBrand, foundBrand, foundUser] = await Promise.all([
      this.repository.findOne({ name: dto.name }),
      this.repository.findOne({ id }),
      this.userRepository.findOne({ id: userId }),
    ]);

    if (!foundBrand) throw new NotFoundException('marca não encontrada');

    if (foundUser.type !== UserTypes.admin)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    if (tempBrand) throw new BadRequestException('marca já existente');

    await this.repository.update(id, dto);
    return await this.repository.findOne({ id });
  }

  async delete(userId: string, id: string): Promise<any> {
    const [foundBrand, foundUser] = await Promise.all([
      this.repository.findOne({ id }),
      this.userRepository.findOne({ id: userId }),
    ]);

    if (foundUser.type !== UserTypes.admin)
      throw new ForbiddenException(MessageErrors.forbidenToAccess);

    if (!foundBrand) throw new NotFoundException('marca não encontrado');

    return await this.repository.delete(id);
  }

  async findOne(query: BrandEntity): Promise<BrandEntity> {
    return this.repository.findOne(query);
  }

  async findById(id: string): Promise<BrandEntity> {
    return this.repository.findOne({ id });
  }

  async find(query: FindBrandDto): Promise<[BrandEntity[], number]> {
    const { skip, take, relations, orderBy, select, where } = query;

    return this.repository.findAndCount({
      order: { created_at: orderBy },
      skip,
      take,
      relations,
      select,
      where,
    });
  }
}
