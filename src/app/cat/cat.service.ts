import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CatEntity } from './cat.dto';

@Injectable()
export class catService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepo: MongoRepository<CatEntity>,
  ) {}

  createCat(name: string) {
    const newCat = new CatEntity({ name });
    this.catRepo.save(newCat);
  }
}
