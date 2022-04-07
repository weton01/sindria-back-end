import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptAdapter, JwtStrategy } from '@app/utils';
import { JwtConfig, MailerConfig, TypeormConfig } from '@app/common';
import { UserEntity } from './entities/user';
import { GoogleStrategy } from '@app/utils/passports/google';
import { FacebookStrategy } from '@app/utils/passports/facebook';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeormConfig,
    JwtConfig,
    MailerConfig,
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
