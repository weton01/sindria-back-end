import { JwtModule } from '@nestjs/jwt';
import { envs } from '../envs/envs';

export const JwtConfig = JwtModule.register({
  secret: envs.JWT_SECRET,
  signOptions: { expiresIn: '1000000000s' },
});
