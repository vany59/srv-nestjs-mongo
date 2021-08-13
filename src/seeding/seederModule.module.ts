import { Module } from '@nestjs/common';
import { UserModule } from '@app/user/user.module';
import ConfigurationModule from '@config/config.module';
import { DatabaseModule } from '../database/database.module';
import { SeederService } from './seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Province, ProvinceSchema } from '@app/constant/province/province.dto';
import { District, DistrictSchema } from '@app/constant/district/district.dto';
import { Ward, WardSchema } from '@app/constant/ward/ward.dto';

@Module({
  imports: [
    UserModule,
    ConfigurationModule,
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Province.name, schema: ProvinceSchema },
      { name: District.name, schema: DistrictSchema },
      { name: Ward.name, schema: WardSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
