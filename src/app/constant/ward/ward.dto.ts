import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WardDocument = Ward & Document;
@Schema()
export class Ward {
  @Prop()
  name: string;

  @Prop()
  district: string;
}

export const WardSchema = SchemaFactory.createForClass(Ward);
WardSchema.index({ district: 1 });
WardSchema.index({ name: 'text' }, { name: 'search' });
