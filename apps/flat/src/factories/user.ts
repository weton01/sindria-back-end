import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/user';
import { BcryptAdapter, JwtStrategy, GoogleStrategy } from '../utils';
import { UserController } from '../controllers/user';
import { UserService } from '../services/user';
import { JwtModule } from '@nestjs/jwt';
import { CodeService } from '../services/code';
import { Code, CodeSchema } from '../entities/code';
import { FacebookStrategy } from '../utils/passports/facebook';
import { envs } from '../utils/envs/envs';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Code.name, schema: CodeSchema },
    ]),
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: { expiresIn: '1000000000s' },
      verifyOptions: {
        ignoreExpiration: true,
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    BcryptAdapter,
    JwtStrategy,
    CodeService,
    GoogleStrategy,
    FacebookStrategy,
  ],
})
export class UserModule {}
