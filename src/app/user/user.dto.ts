import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema, Base } from '@utils/dto';

export type UserDocument = User & Document;
@Schema({ collection: 'user' })
export class User extends Base {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop({ type: 'boolean', default: false })
  isRoot?: boolean;

  @Prop({ type: 'boolean', default: true })
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.add(BaseSchema);
UserSchema.index({ phone: 1, username: 1 }, { unique: true });
UserSchema.index(
  { phone: 'text', username: 'text', email: 'text', name: 'text' },
  { name: 'search' },
);

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
