import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { MutationDto } from '@/inventory/mutation/dtos/mutation';
import { MessageErrors } from '@app/common/messages';
import { JunoService } from '@app/utils/juno/juno.service';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreDto } from './dtos/store';
import { UpdateStoreDto } from './dtos/update';
import { StoreEntity } from './entities/store';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly repository: Repository<StoreEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly junoService: JunoService,
  ) {}

  async create(userId: string, dto: StoreDto): Promise<StoreEntity> {
    const [foundStore, foundUser, foundAddress] = await Promise.all([
      this.repository.findOne({ name: dto.name }),
      this.userRepository.findOne({ where: { id: userId } }),
      this.addressRepository.findOne({ id: dto.address.id }),
    ]);

    if (foundStore) {
      throw new ConflictException('já existe uma loja com esse nome');
    }

    if (!foundUser) {
      throw new BadRequestException(MessageErrors.userNotFound);
    }

    if (foundUser.isStore) {
      throw new BadRequestException('usuário já possui uma loja');
    }

    if (!foundAddress) {
      throw new BadRequestException('endereço não encontrado');
    }

    const tempStore = this.repository.create({
      ...dto,
      address: foundAddress,
      user: foundUser,
    });

    foundUser.isStore = true;
    foundUser.store = tempStore;
    const store = await this.repository.save(tempStore);
    await this.userRepository.save(foundUser);
    return store;
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateStoreDto,
  ): Promise<StoreEntity> {
    const [foundStore, foundUser, foundAddress] = await Promise.all([
      this.repository.findOne({ where: { id: id } }),
      this.userRepository.findOne({
        where: { id: userId },
        relations: ['store'],
      }),
      this.addressRepository.findOne({ id: dto.address.id }),
    ]);

    if (!foundStore) {
      throw new BadRequestException('loja não encontrada');
    }

    if (!foundUser) {
      throw new BadRequestException(MessageErrors.userNotFound);
    }

    if (foundUser?.store.id !== foundStore.id) {
      throw new BadRequestException(MessageErrors.forbidenToAccess);
    }

    if (!foundAddress) {
      throw new BadRequestException('endereço não encontrado');
    }

    await this.repository.update({ id }, dto);

    return await this.repository.findOne({ id });
  }

  async delete(userId: string, id: string): Promise<any> {
    const [foundStore, foundUser] = await Promise.all([
      this.repository.findOne({ where: { id } }),
      this.userRepository.findOne({
        where: { id: userId },
        relations: ['store'],
      }),
    ]);

    console.log(foundUser);

    if (!foundUser) {
      throw new BadRequestException(MessageErrors.userNotFound);
    }

    if (!foundStore) {
      throw new BadRequestException('loja não encontrada');
    }

    if (foundUser?.store?.id !== foundStore.id) {
      throw new ForbiddenException(MessageErrors.forbidenToAccess);
    }

    await this.repository.delete({ id });

    return {};
  }

  async find(): Promise<StoreEntity[]> {
    const token = await this.junoService.createAuthToken();
    return;
  }
}
