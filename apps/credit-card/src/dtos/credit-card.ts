import { UserEntity } from '@/auth/entities/user';
import { RegexTypes } from '@app/utils/messages';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

export class CreditCardDto {
  @ApiProperty({
    example: '1111222233334444 || 1111 2222 3333 4444',
  })
  @IsString()
  @Matches(RegexTypes.creditCard, {
    message: 'cartão de crédito inválido, ex: (1111222233334444 || 1111 2222 3333 4444)'
  })
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    example: '111',
  })
  @IsString()
  @IsNotEmpty()
  cvc: string

  @Matches(RegexTypes.expirationDate, {
    message: 'data de expiração inválida, ex: (20/2015)'
  })
  @ApiProperty({
    example: '20/2015'
  })
  expirationDate: string;

  @IsOptional()
  @ApiHideProperty()
  user: UserEntity
}
