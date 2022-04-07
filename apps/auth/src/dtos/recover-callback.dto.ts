import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user';

export class RecoverCallbackDto extends OmitType(UserDto, [
  'activationCode',
  'username',
  'email',
] as const) {}
