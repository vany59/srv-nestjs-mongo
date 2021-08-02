import { BaseEntity } from '@utils/dto';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'cat' })
export class CatEntity extends BaseEntity {
  @Column()
  @IsString()
  @Expose()
  name: string;

  constructor(props: Partial<CatEntity>) {
    super(props);
    Object.assign(this, props);
  }
}
export class CreateCat {
  @IsString()
  name: string;
}
