import { IsString } from 'class-validator';

export class CreateCat {
  @IsString()
  name: string;
}
