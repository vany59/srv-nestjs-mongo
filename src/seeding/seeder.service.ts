import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConfigurationService } from '@config/config.service';

import {
  Province,
  ProvinceDocument,
} from '@app/constant/province/province.dto';
import {
  District,
  DistrictDocument,
} from '@app/constant/district/district.dto';
import { Ward, WardDocument } from '@app/constant/ward/ward.dto';
import { Constant, ConstantDoc } from '@app/constant/constant.dto';

import { Province as dbProvince } from './db/province';
import { District as dbDistrict } from './db/district';
import { Ward as dbWard } from './db/ward';
import { Constant as dbConstant } from './db/constant';

import { User, UserDocument } from '@app/user/user.dto';
import { hash } from '@utils/shared';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Province.name)
    private readonly ProvinceModel: Model<ProvinceDocument>,

    @InjectModel(District.name)
    private readonly DistrictModel: Model<DistrictDocument>,

    @InjectModel(Ward.name)
    private readonly WardModel: Model<WardDocument>,

    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,

    @InjectModel(Constant.name)
    private readonly ConstantModel: Model<ConstantDoc>,

    private readonly configService: ConfigurationService,
  ) {}

  async seed() {
    await Promise.all([
      // this.ProvinceModel.insertMany(dbProvince),
      // this.DistrictModel.insertMany(dbDistrict),
      // this.WardModel.insertMany(dbWard),

      // this.UserModel.insertMany([
      //   {
      //     name: this.configService.getSeeding().rootUser,
      //     passwoord: await hash(
      //       this.configService.getSeeding().rootPassword,
      //       this.configService.getTokenEncryptSecret(),
      //     ),
      //     isRoot: true,
      //   },
      // ]),

      this.ConstantModel.insertMany(dbConstant),
    ]);
    return;
  }
}
