import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { uuid } from '@utils/uuid';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  @Expose()
  id: string;

  @Column()
  @Expose()
  @IsNotEmpty()
  name: string;

  @Column()
  @Expose()
  @IsNotEmpty()
  username: string;

  @Column()
  @Expose()
  @IsNotEmpty()
  password: string;

  @Column()
  @Expose()
  @IsNotEmpty()
  isRoot: boolean;

  @Column()
  @Expose()
  isActive: boolean;

  @Column()
  @Expose()
  createdAt: string;

  @Column()
  @Expose()
  updatedAt: string;

  constructor(props: Partial<UserEntity>) {
    Object.assign(this, props);
    this.id = this.id || uuid();
    this.isActive = this.isActive || true;
    this.isRoot = this.isRoot || false;
    this.createdAt = this.createdAt || (+new Date()).toString();
  }
}

export class UserInput {
  @Expose()
  @IsString()
  @IsNotEmpty()
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
