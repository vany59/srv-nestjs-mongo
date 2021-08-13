import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DistrictDocument = District & Document;
@Schema()
export class District {
  @Prop()
  name: string;

  @Prop()
  province: string;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
DistrictSchema.index({ province: 1 });
DistrictSchema.index({ name: 'text' }, { name: 'search' });
