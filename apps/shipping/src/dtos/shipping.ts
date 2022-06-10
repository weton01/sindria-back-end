import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsArray,
  IsString,
} from 'class-validator';

export class ShippingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sCepOrigem: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sCepDestino: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nVlPeso: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nCdFormato: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nVlComprimento: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nVlAltura: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nVlLargura: string;

  @ApiProperty({
    example: 'field,field',
  })
  @IsArray()
  @IsNotEmpty()
  nCdServico: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nVlDiametro: string;
}
