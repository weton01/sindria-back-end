import { UserEntity } from '@/auth/entities/user';
import { CypervService } from '@app/utils/adapters/cyperv/cyperv.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCreditCardDto } from './dtos/create';
import { CreditCardEntity } from './entities/credit-card';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCardEntity)
    private readonly repository: Repository<CreditCardEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cypervService: CypervService,
  ) {}

  async create(
    userId: string,
    dto: CreateCreditCardDto,
  ): Promise<CreditCardEntity> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    const foundCCs = await this.repository.find({ user: foundUser });

    const alreadyExists = foundCCs.find(
      (CC) => dto.number === this.cypervService.decrypt(CC.number),
    );

    if (alreadyExists)
      throw new ConflictException('cartão de crédito já cadastrado');

    const cc = await this.repository.create({
      ...dto,
      user: foundUser,
      number: this.cypervService.encrypt(dto.number),
      cvc: this.cypervService.encrypt(dto.cvc),
    });

    const newCC = await this.repository.save(cc);

    return {
      ...newCC,
      cvc: '***',
      number: this.cypervService
        .decrypt(newCC.number)
        .replace(/.(?=.{4})/g, '*'),
    };
  }

  async delete(userId: string, id: string): Promise<any> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    const foundAddress = this.repository.findOne({ id, user: foundUser });

    if (!foundAddress)
      throw new NotFoundException('cartão de crédito não encontrado');

    return await this.repository.delete(id);
  }

  async findById(id: string): Promise<CreditCardEntity> {
    const foundCC = await this.repository.findOne({ id });

    if (!foundCC)
      throw new NotFoundException('cartão de crédito não encontrado');

    return {
      ...foundCC,
      cvc: '***',
      number: this.cypervService
        .decrypt(foundCC.number)
        .replace(/.(?=.{4})/g, '*'),
    };
  }

  async find(userId: string): Promise<CreditCardEntity[]> {
    const foundUser = await this.userRepository.findOne({ id: userId });

    if (!foundUser) throw new NotFoundException('usuário não encontrado');

    const creditCards = await this.repository.find({ user: foundUser });

    console.log('creditCards', creditCards, foundUser);

    return creditCards.map((cc) => ({
      ...cc,
      cvc: '***',
      number: this.cypervService.decrypt(cc.number).replace(/.(?=.{4})/g, '*'),
    }));
  }
}
