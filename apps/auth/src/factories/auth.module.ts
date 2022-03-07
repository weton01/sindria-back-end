import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptAdapter, JwtStrategy } from '@app/utils';
import { JwtConfig, MailerConfig, TypeormConfig } from '@app/common';
import { UserEntity } from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeormConfig,
    JwtConfig,
    MailerConfig,
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptAdapter, JwtStrategy],
})
export class AuthModule {}
