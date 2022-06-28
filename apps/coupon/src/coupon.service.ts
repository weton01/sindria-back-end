import { UserEntity } from '@/auth/entities/user';
import { UserTypes } from '@app/common';
import { MessageErrors } from '@app/utils/messages';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponDto } from './dtos/coupon';
import { FindCouponDto } from './dtos/find';
import { CouponEntity } from './entities/coupon';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(CouponEntity)
    private readonly repository: Repository<CouponEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(userId: string, toId: string, dto: CouponDto,): Promise<CouponEntity> {
    const [foundUser, foundAdmin] = await Promise.all([
      this.userRepository.findOne({ id: toId }),
      this.userRepository.findOne({ id: userId })
    ])

    if (!foundUser) {
      throw new NotFoundException(MessageErrors.userNotFound);
    }

    if (!foundAdmin) {
      throw new NotFoundException(MessageErrors.userNotFound);
    }

    if (foundAdmin.type !== UserTypes.admin) {
      throw new ForbiddenException(MessageErrors.forbidenToAccess);
    }

    const tempCoupon = this.repository.create({
      ...dto,
      user: foundUser
    })

    return await this.repository.save(tempCoupon);
  }

  async useCoupon(userId: string, id: string): Promise<CouponEntity> {
    const [foundUser, foundCoupon] = await Promise.all([
      this.userRepository.findOne({ id: userId }),
      this.repository.findOne({ where: {id}, relations: ['user'] }),
    ])

    if (!foundUser) {
      throw new NotFoundException(MessageErrors.userNotFound);
    }

    if (!foundCoupon) {
      throw new NotFoundException('cupom não encontrado');
    }
 
    if (foundCoupon?.user?.id !== foundUser.id) {
      throw new ForbiddenException(MessageErrors.forbidenToAccess)
    }

    foundCoupon.used = true;

    return await this.repository.save(foundCoupon);
  }

  async delete(userId: string, id: string): Promise<any> {
    const [foundCoupon, foundUser] = await Promise.all([
      this.repository.findOne({ id }),
      this.userRepository.findOne({ id: userId }),
    ]);

    if (!foundUser) {
      throw new NotFoundException(MessageErrors.userNotFound);
    }

    if (!foundCoupon) {
      throw new NotFoundException('cupom não encontrado');
    }

    if (foundCoupon.user.id !== foundUser.id) {
      throw new ForbiddenException(MessageErrors.forbidenToAccess)
    }

    return await this.repository.delete(id);
  }

  async find(userId: string, query: FindCouponDto,): Promise<[CouponEntity[], number]> {
    const { skip, take } = query;

    return this.repository.findAndCount({
      skip,
      take,
      where: {
        user: { id: userId }
      }
    });
  }
}
