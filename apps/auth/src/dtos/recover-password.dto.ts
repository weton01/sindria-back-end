import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user';

export class RecoverPasswordDto extends OmitType(UserDto, [
  'activationCode',
  'username',
  'password',
] as const) {}
