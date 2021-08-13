import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProvinceDocument = Province & Document;
@Schema({ collection: 'province' })
export class Province {
  @Prop()
  name: string;

  @Prop({ type: Boolean })
  isCity: boolean;
}
export const ProvinceSchema = SchemaFactory.createForClass(Province);
ProvinceSchema.index({ isCity: 1 });
ProvinceSchema.index({ name: 'text' }, { name: 'search' });
