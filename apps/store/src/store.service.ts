import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { envs } from '@app/common';
import { MessageErrors } from '@app/common/messages';
import { AsaasService } from '@app/utils/asaas/asaas.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { FindStoreDto } from './dtos/find';
import { StoreDto } from './dtos/store';
import { UpdateStoreDto } from './dtos/update';
import { IntegrationEntity } from './entities/integration';
import { StoreEntity } from './entities/store';

@Injectable()
export class StoreService {
  constructor(
    private connection: Connection,

    @InjectRepository(StoreEntity)
    private readonly repository: Repository<StoreEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(IntegrationEntity)
    private readonly integrationRepository: Repository<IntegrationEntity>,
    private readonly asaasService: AsaasService,
  ) {}

  async create(userId: string, dto: StoreDto): Promise<StoreEntity> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
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

      if (!foundAddress) {
        throw new BadRequestException('endereço não encontrado');
      }

      const digitalAccount =
        await this.asaasService.digitalAccount.createDigitalAccount(dto.meta);

      const customer = await this.asaasService.customer.createCustomer({
        ...dto.meta,
        observations: "there isn't observations",
        externalReference: 'null',
        notificationDisabled: true,
      });

      const webhook = await this.asaasService.webhook.createWebhook({
        apiVersion: 3,
        authToken: digitalAccount.apiKey,
        email: digitalAccount.email,
        enabled: true,
        interrupted: false,
        url: `${envs.PROD_URL}/payment/v1/charge/webhook`,
      });

      const tempDto = { ...dto };
      delete tempDto.meta;

      const tempStore = this.repository.create({
        ...dto,
        address: foundAddress,
        user: foundUser,
      });

      const tempIntegration = this.integrationRepository.create({
        meta: {
          digitalAccount,
          customer,
        },
        webhook,
      });

      const store = await queryRunner.manager.save(tempStore);
      tempIntegration.store = store;
      await queryRunner.manager.save(tempIntegration);
      await queryRunner.commitTransaction();

      return { ...store, paymentIntegration: tempIntegration };
    } catch (err) {
      console.error(JSON.stringify(err));
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateStoreDto,
  ): Promise<StoreEntity> {
    const [foundStore, foundUser, foundAddress] = await Promise.all([
      this.repository.findOne({ where: { id: id }, relations: ['user'] }),
      this.userRepository.findOne({
        where: { id: userId },
        relations: ['stores'],
      }),
      this.addressRepository.findOne({ id: dto.address.id }),
    ]);

    if (!foundStore) {
      throw new BadRequestException('loja não encontrada');
    }

    if (!foundUser) {
      throw new BadRequestException(MessageErrors.userNotFound);
    }

    if (foundUser?.id !== foundStore.user.id) {
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
      this.repository.findOne({
        where: { id },
        relations: ['user', 'address'],
      }),
      this.userRepository.findOne({
        where: { id: userId },
        relations: ['stores'],
      }),
    ]);

    if (!foundUser) {
      throw new BadRequestException(MessageErrors.userNotFound);
    }

    if (!foundStore) {
      throw new BadRequestException('loja não encontrada');
    }

    if (foundUser?.id !== foundStore.user.id) {
      throw new BadRequestException(MessageErrors.forbidenToAccess);
    }

    await this.repository.update({ id }, { active: false });

    return {};
  }

  async find(
    query: FindStoreDto,
    id: string,
  ): Promise<[StoreEntity[], number]> {
    const { skip, take, relations, orderBy } = query;

    return this.repository.findAndCount({
      where: { user: { id } },
      order: { created_at: orderBy },
      skip,
      take,
      relations,
    });
  }

  async findById(id: string): Promise<StoreEntity> {
    const store = await this.repository.findOne({
      where: { id },
      relations: ['paymentIntegration', 'address', 'user'],
    });

    if (!store) {
      throw new NotFoundException('loja não encontrada');
    }

    return store;
  }
}
