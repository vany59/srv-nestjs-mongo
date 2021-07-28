import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Column, ObjectIdColumn } from 'typeorm';
import { uuid } from './uuid';

export class IdDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;
}
export abstract class BaseEntity {
  @ObjectIdColumn()
  @IsString()
  @Expose()
  _id: string;

  @Column()
  @IsString()
  @Expose()
  createdAt: Date;

  @Column()
  @IsString()
  @Expose()
  updatedAt: Date;

  @Column()
  @IsBoolean()
  @Expose()
  isDeleted: boolean;

  constructor(props: Partial<BaseEntity>) {
    Object.assign(this, props);
    this._id = this._id || uuid();
    this.isDeleted = this.isDeleted || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
