import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FindCommentDto {
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

  @IsOptional()
  @Transform(
    ({ value }) => {
      if (value) return Object.fromEntries(new URLSearchParams(value));
      return {};
    },
    { toClassOnly: true },
  )
  orderBy: any;
}
