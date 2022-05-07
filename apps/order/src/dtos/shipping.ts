import { OrderStatus } from '@app/common/enums/order-status.';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsISO8601 } from 'class-validator';

export class ShippingProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  trackingCode: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  trackingStatus: OrderStatus;

  @ApiProperty()
  @IsISO8601()
  @IsNotEmpty()
  trackingDate: string;
}
