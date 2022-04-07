import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user';

export class CreateUserDto extends OmitType(UserDto, [
  'activationCode',
] as const) {}
