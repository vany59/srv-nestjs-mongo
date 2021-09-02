import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ConstantDoc = Constant & Document;

class Name {
  vi: string;
  en: string;
}

@Schema({ collection: 'constant' })
export class Constant {
  @Prop()
  name: Name;

  @Prop()
  type: string;
}
export const ConstantSchema = SchemaFactory.createForClass(Constant);
