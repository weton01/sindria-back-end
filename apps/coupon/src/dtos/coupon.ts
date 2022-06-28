import { CouponTypes } from '@app/common/enums/coupon-type';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export class CouponDto {
  @ApiProperty({
    example: 'any_name',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty( )
  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @ApiProperty( )
  @IsEnum(CouponTypes)
  @IsNotEmpty()
  type: CouponTypes;
}
