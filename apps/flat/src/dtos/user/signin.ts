import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user';

export class SignInDto extends OmitType(UserDto, [
  'firstName',
  'lastName',
  'email',
] as const) {}
