import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstantEntity } from './constant.dto';
import { ProvinceController } from './province/province.controller';
import { ProvinceEntity } from './province/province.dto';
import { ConstController } from './srvConstant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProvinceEntity, ConstantEntity])],
  controllers: [ConstController, ProvinceController],
})
export class SrvConstantModule {}
