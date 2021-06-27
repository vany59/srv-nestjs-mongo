import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsString, Min } from 'class-validator';
import { uuid } from '@utils/uuid';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  @Expose()
  id: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  username: string;

  @Column()
  @Expose()
  @IsEmpty()
  password: string;

  @Column()
  @Expose()
  isRoot: boolean;

  @Column()
  @Expose()
  isActive: boolean;

  @Column()
  @Expose()
  createdAt: string;

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
  @Min(6)
  @IsNotEmpty()
  username: string;
}

export class UserLogin extends UserInput {
  @Expose()
  @IsString()
  @Min(8)
  @IsNotEmpty()
  password: string;
}
