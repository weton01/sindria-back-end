import { OmitType, PartialType } from '@nestjs/swagger'; 
import { UserDto } from './user';

class UserAuxDto extends OmitType(UserDto, ['email', 'cellphone'] as const) {}

export class UpdateUserDto extends PartialType(UserAuxDto) {}
