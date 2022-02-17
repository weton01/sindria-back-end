import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { BcryptAdapter, envs, JwtStrategy } from '@app/utils';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `${envs.MONGO_URI}`,
      entities: [UserEntity],
      ssl: true,
      authSource: 'admin',
    }),
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: { expiresIn: '1000000000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptAdapter, JwtStrategy],
})
export class AuthModule {}
