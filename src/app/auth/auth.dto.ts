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
