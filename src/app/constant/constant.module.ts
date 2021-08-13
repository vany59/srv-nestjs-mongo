import { Module } from '@nestjs/common';
import { ProvinceController } from './province/province.controller';
import { ConstController } from './constant.controller';

@Module({
  controllers: [ConstController, ProvinceController],
})
export class ConstantModule {}
