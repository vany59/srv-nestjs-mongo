import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { uuid } from './uuid';

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

@Schema()
export class Base {
  _id: string;

  @Prop({ default: new Date(), type: Date })
  createdAt?: Date;

  @Prop({ default: new Date(), type: Date })
  createdBy?: string;

  @Prop({ default: new Date(), type: Date })
  updatedAt?: Date;

  @Prop()
  updatedBy?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;

  @Prop()
  deletedBy?: string;
}
export const BaseSchema = SchemaFactory.createForClass(Base);
