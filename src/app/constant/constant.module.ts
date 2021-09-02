import { Module } from '@nestjs/common';
import { ProvinceController } from './province/province.controller';
import { ConstController } from './constant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Constant, ConstantSchema } from './constant.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Constant.name, schema: ConstantSchema },
    ]),
  ],
  controllers: [ConstController, ProvinceController],
})
export class ConstantModule {}
