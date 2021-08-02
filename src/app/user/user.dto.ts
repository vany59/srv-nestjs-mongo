import {
  Entity,
  Column,
  PrimaryColumn,
  ObjectIdColumn,
  BaseEntity,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { uuid } from '@utils/uuid';

@Entity()
export class UserEntity extends BaseEntity {
  @ObjectIdColumn()
  @Expose()
  _id: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  username: string;

  @Column()
  @Expose()
  password: string;

  @Column()
  @Expose()
  isRoot: boolean;

  @Column()
  @Expose()
  isActive: boolean;

  @Column()
  @Expose()
  isDeleted: boolean;

  @Column()
  @Expose()
  createdAt: string;

  @Column()
  @Expose()
  updatedAt: string;

  constructor(props: Partial<UserEntity>) {
    super();
    Object.assign(this, props);
    this.isRoot = this.isRoot || false;
  }
}
