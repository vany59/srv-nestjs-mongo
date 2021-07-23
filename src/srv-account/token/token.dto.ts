import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'token' })
export class TokenEntity {
  @ObjectIdColumn()
  @IsString()
  @Expose()
  _id: string;

  @Column()
  @IsString()
  @Expose()
  accessToken: string;

  @Column({ type: 'date' })
  @IsString()
  @Expose()
  accessTokenExpiresAt: string;

  @Column()
  @IsString()
  @Expose()
  refreshToken: string;

  @Column({ type: 'date' })
  @IsString()
  @Expose()
  refreshTokenExpiresAt: string;

  @Column()
  @IsString()
  @Expose()
  authorizaionCode: string;

  @Column()
  @IsString()
  @Expose()
  redirectUri: string;

  @Column({ type: 'date' })
  @IsString()
  @Expose()
  expireAt: string;

  @Column()
  @IsString()
  @Expose()
  scope: string;

  @Column()
  @IsString()
  @Expose()
  client: string;

  @Column()
  @IsString()
  @Expose()
  user: string;
}
