import { MessageErrors, RegexTypes } from '@app/common/messages';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class AddressDto {
  @ApiProperty({
    example: '11111-111',
  })
  @Matches(RegexTypes.cep, { message: MessageErrors.invalidCep })
  @IsString()
  @IsNotEmpty()
  cep: string;

  @ApiProperty({
    example: 'Any State',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    example: 'Any city',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: '11',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    example: 'Any Neighborhood',
  })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({
    example: 'Any Street',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    example: 'Any Complement',
  })
  @IsString()
  @IsOptional()
  complement: string;
}
