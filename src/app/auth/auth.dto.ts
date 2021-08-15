import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base, BaseSchema } from '@utils/dto';
import { IsNotEmpty, IsString } from 'class-validator';

export type AuthDocument = Auth & Document;
@Schema({ collection: 'auth' })
export class Auth extends Base {
  @Prop()
  userId: string;

  @Prop()
  accessToken: string;

  @Prop()
  accessTokenExpiresAt: Date;

  @Prop()
  refreshToken: string;

  @Prop()
  refreshTokenExpiresAt: Date;

  @Prop()
  scope: string;

  @Prop()
  authType: string;
}
export const AuthSchema = SchemaFactory.createForClass(Auth);
AuthSchema.add(BaseSchema);

export class GetToken {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateToken {
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export interface AuthToken {
  userId: string;
  isRoot: boolean;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  authType: string;
}
