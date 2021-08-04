import { Entity, Column } from 'typeorm';
import { Expose } from 'class-transformer';
import { BaseEntity } from '@utils/dto';
import { IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  username: string;

  @Column()
  @Expose()
  phone: string;

  @Column()
  @Expose()
  password: string;

  @Column()
  @Expose()
  isRoot?: boolean;

  @Column()
  @Expose()
  isActive?: boolean;

  constructor(props: Partial<UserEntity>) {
    super(props);
    Object.assign(this, props);
    this.isRoot = this.isRoot || false;
    this.isActive = this.isActive || true;
  }
}

export class Register {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, {
    message: 'phone must be a valid phone number',
  })
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
