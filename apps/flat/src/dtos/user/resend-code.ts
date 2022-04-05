import { OmitType } from '@nestjs/swagger'; 
import { UserDto } from './user';

export class ResendCodeDto extends OmitType(UserDto, [ 'cellphone', 'firstName', 'lastName' ] as const) {}
