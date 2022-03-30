import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user';

export class AuthUserDto extends OmitType(UserDto, ['activationCode', 'username'] as const) { }
