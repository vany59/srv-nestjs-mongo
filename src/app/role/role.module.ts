import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './role.controller';
import { Mission, MissionSchema, Privilege, PrivilegeSchema } from './role.dto';
import { RoleService } from './role.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mission.name, schema: MissionSchema },
      { name: Privilege.name, schema: PrivilegeSchema },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class CatModule {}
