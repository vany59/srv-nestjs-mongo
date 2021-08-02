import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProvinceEntity } from '@app/constant/province/province.dto';
import { DistrictEntity } from '@app/constant/district/district.dto';
import { WardEntity } from '@app/constant/ward/ward.dto';

import { Province } from './db/province';
import { District } from './db/district';
import { Ward } from './db/ward';
import { ConfigurationService } from '@config/config.service';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: MongoRepository<ProvinceEntity>,

    @InjectRepository(DistrictEntity)
    private readonly districtRepository: MongoRepository<DistrictEntity>,

    @InjectRepository(WardEntity)
    private readonly wardRepository: MongoRepository<WardEntity>,

    private readonly configService: ConfigurationService,
  ) {}

  async seed() {
    //province
    if ((await this.provinceRepository.find()).length) {
      await this.provinceRepository.insertMany(Province);
    }

    //district
    if ((await this.districtRepository.find()).length) {
      await this.districtRepository.insertMany(District);
    }

    //ward
    if ((await this.wardRepository.find()).length) {
      await this.wardRepository.insertMany(Ward);
    }

    //user
  }
}
