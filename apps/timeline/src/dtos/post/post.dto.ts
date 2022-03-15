import { UserEntity } from '@/auth/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class AdditionalType {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PostDto {

  @ApiProperty({
    example: 'lorem impsun dore',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'https://any_url.com',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNumber()
  likes: UserEntity[];

  @ApiProperty()
  @IsOptional()
  shared: UserEntity[];

  @IsOptional()
  user: UserEntity;
}
