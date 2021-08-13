import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'fs.files' })
export class Upload extends Document {
  @Prop()
  filename: string;

  @Prop({ type: Number })
  length: number;

  @Prop({ type: Number })
  chunkSize: number;

  @Prop()
  md5: string;

  @Prop()
  contentType: string;

  @Prop({ type: Object })
  metadata: Object;

  @Prop({ type: Date })
  uploadDate: Date;
}
export const UploadSchema = SchemaFactory.createForClass(Upload);
