import { Module } from '@nestjs/common';
import { UserModule } from '@app/user/user.module';
import ConfigurationModule from '@config/config.module';
import { DatabaseModule } from '../database/database.module';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceEntity } from '@app/constant/province/province.dto';
import { DistrictEntity } from '@app/constant/district/district.dto';
import { WardEntity } from '@app/constant/ward/ward.dto';

@Module({
  imports: [
    UserModule,
    ConfigurationModule,
    DatabaseModule,
    TypeOrmModule.forFeature([ProvinceEntity, DistrictEntity, WardEntity]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
