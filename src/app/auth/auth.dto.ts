import { BaseEntity } from '@utils/dto';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'auth' })
export class AuthEntity extends BaseEntity {
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
    super(props);
    Object.assign(this, props);
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
