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
  @Expose()
  _id?: string;

  @Column()
  @Expose()
  createdAt?: Date;

  @Column()
  @Expose()
  createdBy?: string;

  @Column()
  @Expose()
  updatedAt?: Date;

  @Column()
  @Expose()
  updatedBy?: string;

  @Column()
  @Expose()
  isDeleted?: boolean;

  @Column()
  @Expose()
  deletedBy?: string;

  constructor(props: Partial<BaseEntity>) {
    Object.assign(this, props);
    this._id = this._id || uuid();
    this.isDeleted = this.isDeleted || false;
    this.createdAt = this.createdAt || new Date();
    this.createdBy = this.createdBy || 'system';
    this.updatedAt = new Date();
    this.updatedBy = this.updatedBy || 'system';
    this.deletedBy = this.deletedBy || '';
  }
}
