import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user';

export class ActiveUserDto extends OmitType(UserDto, ['email', 'password', 'username'] as const) { }
