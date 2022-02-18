import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ActiveUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  activationCode: string;
}
