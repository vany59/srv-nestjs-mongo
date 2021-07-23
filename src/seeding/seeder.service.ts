import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProvinceEntity } from '@srv-constant/province/province.dto';
import { DistrictEntity } from '@srv-constant/district/district.dto';
import { WardEntity } from '@srv-constant/ward/ward.dto';

import { Province } from './db/province';
import { District } from './db/district';
import { Ward } from './db/ward';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: MongoRepository<ProvinceEntity>,

    @InjectRepository(DistrictEntity)
    private readonly districtRepository: MongoRepository<DistrictEntity>,

    @InjectRepository(WardEntity)
    private readonly wardRepository: MongoRepository<WardEntity>,
  ) {}

  async seed() {
    await this.provinceRepository.insertMany(Province);
    await this.districtRepository.insertMany(District);
    await this.wardRepository.insertMany(Ward);
  }
}
