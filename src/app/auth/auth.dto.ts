import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

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

export class TokenRes {
  @Expose()
  userId: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
