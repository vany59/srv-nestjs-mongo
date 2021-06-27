import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class IdDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;
}
