import { uuid } from '@utils/uuid';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class ConstantEntity {
  @ObjectIdColumn()
  @Expose()
  @IsString()
  _id: string;

  @Column()
  @Expose()
  @IsString()
  kind: string;

  @Column()
  @Expose()
  @IsString({ each: true })
  company: string[];

  constructor(props: Partial<ConstantEntity>) {
    Object.assign(this, props);
    this._id = this._id || uuid();
  }
}
