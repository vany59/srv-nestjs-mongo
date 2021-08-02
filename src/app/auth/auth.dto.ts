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
}

export class AuthDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  name: string;
}

export class GetToken {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UToken {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}

export class TokenRes extends UToken {
  @Expose()
  userId: string;
}

export class Token {
  @Expose()
  @IsString()
  _id: string;

  @Expose()
  @IsString()
  username: string;
}
