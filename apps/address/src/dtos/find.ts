import { OrderBy } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { AddressDto } from './adddress';

enum Relations {
  user,
}

enum Fields {
  id,
  cep,
  state,
  city,
  number,
  neighborhood,
  street,
  complement,
  created_at,
  updated_at,
}

export class FindAddressDto {
  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  skip: number;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  take: number;

  @ApiProperty({
    example: 'relation,relation',
  })
  @Transform(
    ({ value }) => {
      if (value) return value.split(',');
      return [];
    },
    { toClassOnly: true },
  )
  @IsOptional()
  @IsEnum(Relations, { each: true })
  relations: string[];

  @ApiProperty({
    example: 'DESC',
  })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy: OrderBy;

  @ApiProperty({
    example: 'field,field',
  })
  @Transform(
    ({ value }) => {
      if (value) return value.split(',');
      return ['id'];
    },
    { toClassOnly: true },
  )
  @IsOptional()
  @IsEnum(Fields, { each: true })
  select: any;

  @IsOptional()
  @Transform(
    ({ value }) => {
      if (value) return Object.fromEntries(new URLSearchParams(value));
      return {};
    },
    { toClassOnly: true },
  )
  where: AddressDto;
}
