import { UserEntity } from '@/auth/entities/user';
import { TypeormConfig } from '@app/common';
import { CypervModule, JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';
import { CreditCardEntity } from './entities/credit-card';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditCardEntity, UserEntity]),
    CypervModule.register({
      ALGORITHM: 'aes-256-cbc',
      ENCODING: 'hex',
      IV_LENGTH: 16,
      KEY: '123qwe1231231231'!,
    }),
    TypeormConfig,
  ],
  controllers: [CreditCardController],
  providers: [CreditCardService, JwtStrategy],
})
export class CreditCardModule {}
