import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base, BaseSchema } from '@utils/dto';

export type MissionDoc = Mission & Document;
@Schema({ collection: 'mission' })
export class Mission extends Base {
  @Prop()
  name: string;
}
export const MissionSchema = SchemaFactory.createForClass(Mission);
MissionSchema.add(BaseSchema);

export type PrivilegeDoc = Privilege & Document;
@Schema({ collection: 'privilege' })
export class Privilege extends Base {
  @Prop()
  name: string;

  @Prop()
  missionId: string;
}
export const PrivilegeSchema = SchemaFactory.createForClass(Privilege);
PrivilegeSchema.add(BaseSchema);
