import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { OrderDto } from './order';

enum Relations {
  address, creditCard, purchaser, ordersStore, "orderStore.products"
}

enum Fields {
  id, 
  freezePurchaser, 
  invoiceType, 
  created_at, 
  updated_at
}

export class FindOrderDto {
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
    if (value)
      return value.split(',')
    return []
  }, { toClassOnly: true })
  @IsOptional()
  @IsEnum(Relations, { each: true })
  relations: string[]

  @IsOptional()
  @Transform(({ value }) => {
    if (value)
      return Object.fromEntries(new URLSearchParams(value))
    return {}
  }, { toClassOnly: true })
  orderBy: any;

  @ApiProperty({
    example: 'field,field',
  })
  @Transform(({ value }) => {
    if (value)
      return value.split(',')
    return ['id']
  }, { toClassOnly: true })
  @IsOptional()
  @IsEnum(Fields, { each: true })
  select: any

  @ApiProperty({
    example: 'item=2',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value)
      return Object.fromEntries(new URLSearchParams(value))
    return {}
  }, { toClassOnly: true })
  where: OrderDto
}
