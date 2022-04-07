import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user';

export class SignUpDto extends OmitType(UserDto, [
  'firstName',
  'lastName',
  'email'
] as const) {}
