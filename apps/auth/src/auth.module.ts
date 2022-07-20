import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  JwtConfig,
  JwtStrategy,
  MailerConfig,
  TypeormConfig,
} from '@app/common';
import { UserEntity } from './entities/user';
import { GoogleStrategy } from '@app/common/passports/google';
import { FacebookStrategy } from '@app/common/passports/facebook';
import { BcryptAdapter } from '@app/utils/bcrypt/bcrypt';

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
