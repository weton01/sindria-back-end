import { OrderBy } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

enum Relations {
  user
}

export class FindCreditCardDto {
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
  @Transform(({ value }) => {
    if(value)
      return value.split(',')
    return []
  }, { toClassOnly: true })
  @IsOptional()
  @IsEnum(Relations, { each: true })
  relations: string[]

  @ApiProperty({
    example: 'DESC',
  })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy: OrderBy
}
