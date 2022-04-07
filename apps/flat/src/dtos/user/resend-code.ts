import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user';

export class ResendCodeDto extends OmitType(UserDto, [
  'email',
  'firstName',
  'lastName',
] as const) {}
