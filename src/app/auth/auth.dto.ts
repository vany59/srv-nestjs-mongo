import { uuid } from '@utils/uuid';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'auth' })
export class AuthEntity {
  @ObjectIdColumn()
  _id?: string;

  @Column()
  @IsString()
  userId: string;

  @Column()
  @IsString()
  @Expose()
  accessToken: string;

  @Column()
  @IsString()
  @Expose()
  accessTokenExpiresAt: Date;

  @Column()
  @IsString()
  @Expose()
  refreshToken: string;

  @Column()
  @IsString()
  @Expose()
  refreshTokenExpiresAt: Date;

  @Column()
  @IsString()
  @Expose()
  scope: string;

  constructor(props: Partial<AuthEntity>) {
    Object.assign(this, props);
    this._id = this._id || uuid();
  }
}

export class GetToken {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class CreateToken {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
