import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Register, UserEntity } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: MongoRepository<UserEntity>,
  ) {}

  async findOne(query: Object) {
    return (
      (await this.userRepo.findOne({
        isDeleted: false,
        isActive: true,
        ...query,
      })) || null
    );
  }

  async create(data: Register) {
    const { username, phone } = data;
    const user = await this.findOne({ username, phone });
    if (user) return { code: 409, message: 'user.conflict' };
  }

  async save(data): Promise<UserEntity> {
    const { username, phone } = data;
    const user = await this.findOne({ username, phone });
    if (user) throw { code: 409, message: 'user.conflict' };

    const _data = new UserEntity(data);
    if (data._id) {
      await this.userRepo.update({ _id: data._id }, _data);
    } else {
      await this.userRepo.save(_data);
    }
    return _data;
  }
}
