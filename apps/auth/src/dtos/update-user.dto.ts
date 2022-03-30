import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user';

export class UpdateUserDto extends OmitType(UserDto, ['activationCode', 'email'] as const) { }

