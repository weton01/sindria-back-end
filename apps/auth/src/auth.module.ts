import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  envs,
  JwtConfig,
  JwtStrategy,
  MailerConfig,
  TypeormConfig,
} from '@app/common';
import { UserEntity } from './entities/user';
import { GoogleStrategy } from '@app/common/passports/google';
import { FacebookStrategy } from '@app/common/passports/facebook';
import { BcryptAdapter } from '@app/utils/bcrypt/bcrypt';
import { AsaasModule } from '@app/utils/asaas/asaas.module';
import { AsaasMode } from '@app/utils/asaas/enums/asaas-mode';
import { IntegrationEntity } from '@/store/entities/integration';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, IntegrationEntity]),
    TypeormConfig,
    JwtConfig,
    MailerConfig,
    AsaasModule.register({
      MODE: AsaasMode.dev,
      X_API_KEY: envs.ASAAS_TOKEN,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptAdapter,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
})
export class AuthModule {}
