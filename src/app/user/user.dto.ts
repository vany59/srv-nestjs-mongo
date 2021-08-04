import { Entity, Column } from 'typeorm';
import { Expose } from 'class-transformer';
import { BaseEntity } from '@utils/dto';
import { IsBoolean, IsPhoneNumber, IsString } from 'class-validator';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  @Expose()
  @IsString()
  name: string;

  @Column()
  @Expose()
  @IsString()
  username: string;

  @Column()
  @Expose()
  @IsPhoneNumber()
  phone: string;

  @Column()
  @Expose()
  @IsString()
  password: string;

  @Column()
  @Expose()
  @IsBoolean()
  isRoot: boolean;

  @Column()
  @Expose()
  @IsBoolean()
  isActive: boolean;

  constructor(props: Partial<UserEntity>) {
    super(props);
    Object.assign(this, props);
    this.isRoot = this.isRoot || false;
    this.isActive = this.isActive || true;
  }
}

export class Register {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  password: string;
}
