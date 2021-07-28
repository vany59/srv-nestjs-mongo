import { uuid } from '@utils/uuid';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'ward' })
export class WardEntity {
  @ObjectIdColumn({ default: uuid() })
  @Expose()
  _id: string;

  @Column()
  @IsString()
  @Index({ fulltext: true })
  name: string;

  @Column()
  @Expose()
  @IsString()
  district: string;

  constructor(props: Partial<WardEntity>) {
    Object.assign(this, props);
  }
}
