import { Entity, Column, PrimaryColumn, ObjectIdColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { uuid } from '@utils/uuid';

@Entity()
export class UserEntity {
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
  accessToken: string;

  @Column()
  @Expose()
  refreshToken: string;

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
    Object.assign(this, props);
    this._id = this._id || uuid();
    this.isActive = this.isActive || true;
    this.isRoot = this.isRoot || false;
    this.isDeleted = this.isDeleted || false;
    this.createdAt = this.createdAt || (+new Date()).toString();
  }
}

export class UserInput {
  @Expose()
  name: string;

  @Expose()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  username: string;
}

export class UserLogin extends UserInput {
  @Expose()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class UserCreate extends UserLogin {}