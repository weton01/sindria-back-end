import { IsString } from 'class-validator';

export class DeleteFormationDto {
  @IsString()
  id: string;
}
