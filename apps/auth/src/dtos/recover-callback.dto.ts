import { IsString, IsNotEmpty } from 'class-validator';

export class RecoverCallbackDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
