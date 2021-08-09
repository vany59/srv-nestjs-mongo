import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register, UserDocument } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(query: Object) {
    return await this.userModel.findOne({
      isDeleted: false,
      isActive: true,
      ...query,
    });
  }

  async save(data): Promise<UserDocument> {
    const { username, phone } = data;
    const user = await this.findOne({ $or: [{ username }, { phone }] });
    if (user) throw { code: 409, message: 'user.conflict' };

    const _data = new this.userModel(data);
    if (data._id) {
      await this.userModel.updateOne({ _id: data._id }, _data);
    } else {
      const newData = new this.userModel(_data);
      await newData.save();
    }
    return _data;
  }
}
