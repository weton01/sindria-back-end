import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty , IsEmail, Matches, IsOptional, } from 'class-validator';
import { regexCellphone } from '../../utils/validators/cellphone';
 

export class UserDto {
  @ApiProperty({
    example: 'any_name',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'any_lastName',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'any_email@mail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '(66)96666-6666',
  })
  @IsNotEmpty()
  @Matches(
    regexCellphone, 
    { message: 'Invalid Cellphone, example: (66)96666-6666'}
  )
  cellphone: string;

  @ApiHideProperty()
  @IsOptional()
  isGoogle?: boolean;

  @ApiHideProperty()
  @IsOptional()
  isFacebook?: boolean;
}
