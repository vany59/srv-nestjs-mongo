import { uuid } from '@utils/uuid';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'district' })
export class DistrictEntity {
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
  province: string;

  constructor(props: Partial<DistrictEntity>) {
    Object.assign(this, props);
  }
}
