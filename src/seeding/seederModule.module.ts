import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '@app/user/user.module';
import ConfigurationModule from '@config/config.module';
import { DatabaseModule } from '../database/database.module';

import { Province, ProvinceSchema } from '@app/constant/province/province.dto';
import { District, DistrictSchema } from '@app/constant/district/district.dto';
import { Ward, WardSchema } from '@app/constant/ward/ward.dto';
import { User, UserSchema } from '@app/user/user.dto';
import { Constant, ConstantSchema } from '@app/constant/constant.dto';

import { SeederService } from './seeder.service';

@Module({
  imports: [
    UserModule,
    ConfigurationModule,
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Province.name, schema: ProvinceSchema },
      { name: District.name, schema: DistrictSchema },
      { name: Ward.name, schema: WardSchema },
      { name: User.name, schema: UserSchema },
      { name: Constant.name, schema: ConstantSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
