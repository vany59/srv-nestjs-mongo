import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base, BaseSchema } from '@utils/dto';

export type CatDocument = Cat & Document;
@Schema({ collection: 'Cat' })
export class Cat extends Base {
  @Prop()
  name: string;
}
export const CatSchema = SchemaFactory.createForClass(Cat);
CatSchema.add(BaseSchema);
