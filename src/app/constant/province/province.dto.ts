import { uuid } from '@utils/uuid';
import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'province' })
export class ProvinceEntity {
  @ObjectIdColumn({ default: uuid() })
  @Expose()
  _id: string;

  @Column()
  @IsString()
  @Index({ fulltext: true })
  name: string;

  @Column()
  @Expose()
  @IsBoolean()
  isCity: boolean;

  constructor(props: Partial<ProvinceEntity>) {
    Object.assign(this, props);
  }
}
